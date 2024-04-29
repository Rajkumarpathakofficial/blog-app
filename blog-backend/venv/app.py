# blog-backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# SQLite database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the BlogPost model
class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

# Routes for CRUD operations on blog posts
@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = BlogPost.query.all()
    return jsonify([{'id': post.id, 'title': post.title, 'content': post.content} for post in posts])

@app.route('/api/posts/<int:id>', methods=['GET'])
def get_post(id):
    post = BlogPost.query.get_or_404(id)
    return jsonify({'id': post.id, 'title': post.title, 'content': post.content})

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    post = BlogPost(title=data['title'], content=data['content'])
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully!'})

@app.route('/api/posts/<int:id>', methods=['PUT'])
def update_post(id):
    post = BlogPost.query.get_or_404(id)
    data = request.json
    post.title = data['title']
    post.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Post updated successfully!'})

@app.route('/api/posts/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = BlogPost.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully!'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
