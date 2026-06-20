from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route('/')
def index():
    """Serve index.html from the root directory."""
    return send_from_directory('.', 'index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages by communicating with the OpenRouter API."""
    # Dynamically reload environment variables if the .env file is updated
    load_dotenv(override=True)
    
    data = request.json or {}
    user_message = data.get('message', '').strip()
    business_data = data.get('businessData', {})
    
    if not user_message:
        return jsonify({'error': 'Message content is empty'}), 400

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key or api_key == "your_openrouter_api_key_here":
        return jsonify({
            'error': 'API Key not configured',
            'message': 'Please configure your `OPENROUTER_API_KEY` in the `.env` file in the project root.'
        }), 400

    # Build customized system prompt using current dashboard metrics if available
    system_content = (
        "You are a helpful and professional AI Creator Business Manager assistant. "
        "You help content creators optimize their strategy, grow their audience (YouTube, Instagram), "
        "manage their revenue, negotiate brand deals, and keep up with schedules. "
        "Keep your answers concise, practical, and action-oriented. Feel free to use emojis."
    )

    if business_data:
        total_rev = business_data.get('totalRevenue', '$0')
        monthly_trend = business_data.get('monthlyTrend', '')
        sources = business_data.get('sources', {})
        
        system_content += (
            f"\n\nHere are the creator's current business metrics from their dashboard:\n"
            f"- Total Revenue: {total_rev}\n"
            f"- YouTube Revenue: ${sources.get('youtube', 0):,}\n"
            f"- Instagram Revenue: ${sources.get('instagram', 0):,}\n"
            f"- Collaborations Revenue: ${sources.get('collaborations', 0):,}\n"
            f"- Other Revenue: ${sources.get('other', 0):,}\n"
            f"- Monthly Revenue Trend: {monthly_trend}\n\n"
            "Use these actual metrics to provide specific, data-driven advice and business recommendations. "
            "If the user asks about their revenue, growth, or source split, answer accurately using these figures."
        )

    try:
        # Initialize the OpenAI client configured for OpenRouter
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )
        
        # Request completion from OpenRouter using a fast, high-quality model
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://127.0.0.1:5000",
                "X-Title": "AI Creator Business Manager",
            },
            model="openai/gpt-oss-120b",
            max_tokens=1000,
            messages=[
                {
                    "role": "system",
                    "content": system_content
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )
        
        ai_response = completion.choices[0].message.content
        return jsonify({'response': ai_response})

    except Exception as e:
        print(f"Error calling OpenRouter: {str(e)}")
        return jsonify({
            'error': 'API Request Failed',
            'message': f"An error occurred while contacting the AI assistant: {str(e)}"
        }), 500


@app.route('/api/recommendations', methods=['POST'])
def recommendations():
    """Generate structured AI business recommendations for a creator."""
    load_dotenv(override=True)

    data = request.json or {}
    creator = data.get('creatorProfile', {})
    dashboard = data.get('dashboardData', {})

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key or api_key == "your_openrouter_api_key_here":
        return jsonify({
            'error': 'API Key not configured',
            'message': 'Please configure your OPENROUTER_API_KEY in the .env file.'
        }), 400

    # Build a rich context prompt from creator profile + live dashboard metrics
    prompt = f"""
You are an expert creator monetisation strategist. A content creator has shared their profile and business metrics.
Analyse the data and return EXACTLY 5 business recommendations in valid JSON format.

Creator Profile:
- Niche/Category: {creator.get('niche', 'Not specified')}
- Followers: {creator.get('followers', 'Unknown')}
- Engagement Rate: {creator.get('engagement', 'Unknown')}
- Average Views: {creator.get('avgViews', 'Unknown')}
- Audience Age Group: {creator.get('audience', 'Unknown')}
- Content Type: {creator.get('contentType', 'Not specified')}
- Previous Brand Deals: {creator.get('previousDeals', 'None')}

Live Dashboard Metrics:
- Total Revenue: {dashboard.get('totalRevenue', '$0')}
- YouTube Revenue: {dashboard.get('youtubeRevenue', '$0')}
- Instagram Revenue: {dashboard.get('instagramRevenue', '$0')}
- Collaboration Revenue: {dashboard.get('collaborationRevenue', '$0')}
- Brand Deals This Month: {dashboard.get('brandDeals', 0)}

Return ONLY a raw JSON array — no markdown, no code fences, no extra text.
Each object must have these exact keys:
  "title"    — short recommendation title (max 8 words)
  "reason"   — why this applies to this creator (1-2 sentences)
  "impact"   — expected business impact (1 sentence)
  "priority" — exactly one of: "High", "Medium", or "Low"
  "category" — one of: "Revenue", "Audience", "Content", "Partnerships", "Pricing"
  "actions"  — array of 2-3 short, concrete action steps (strings)

Example format:
[
  {{
    "title": "Partner with gaming hardware brands",
    "reason": "Your 8% engagement and 18-24 audience closely match gaming peripheral buyers.",
    "impact": "Could increase sponsorship revenue by 40-60%.",
    "priority": "High",
    "category": "Partnerships",
    "actions": ["Research top gaming keyboard/mouse brands", "Prepare a media kit", "Reach out via email or brand partnership platforms"]
  }}
]
"""

    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )

        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://127.0.0.1:5000",
                "X-Title": "AI Creator Business Manager",
            },
            model="openai/gpt-oss-120b",
            max_tokens=1000,
            messages=[
                {"role": "system", "content": "You are a creator business strategist. Always respond with valid raw JSON only. No markdown."},
                {"role": "user", "content": prompt}
            ]
        )

        raw = completion.choices[0].message.content.strip()

        # Safely strip any accidental markdown code fences
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        raw = raw.strip()

        import json as _json
        recs = _json.loads(raw)
        return jsonify({'recommendations': recs})

    except Exception as e:
        print(f"Recommendations error: {str(e)}")
        return jsonify({
            'error': 'Failed to generate recommendations',
            'message': str(e)
        }), 500


if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, port=5000)   
