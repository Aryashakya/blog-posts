from flask import request, jsonify
from config import app, db
from models import Blog


@app.route("/blogs", methods=["GET"])
def get_blogs():
    blogs = Blog.query.all()
    json_blogs = list(map(lambda x: x.to_json(), blogs))
    return jsonify({"blogs": json_blogs})


@app.route("/create_blog", methods=["POST"])
def create_blog():
    title = request.json.get("title")
    content = request.json.get("content")
    # date = request.json.get("date")
    if not title or not content:
        return (
            jsonify({"message": "You must include a title and content"}),
            400,
        )

    new_blog = Blog(title=title, content=content)
    try:
        db.session.add(new_blog)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":str(e)}),400
    
    return jsonify({"message":"Blog created!"}), 201


@app.route("/update_blog/<int:blog_id>",methods=["PATCH"])
def update_contact(blog_id):
    blog = Blog.query.get(blog_id)
    
    if not blog:
        return jsonify({"message":"Blog not found"}), 404
    
    data = request.json
    blog.title = data.get("title",blog.title)
    blog.content = data.get("content",blog.content)
    
    db.session.commit()
    return jsonify({"message":"Blog updated"}), 200

@app.route("/delete_blog/<int:blog_id>",methods=["DELETE"])
def delete_contact(blog_id):
    blog = Blog.query.get(blog_id)

    if not blog:
        return jsonify({"message": "Blog not found"}), 404
    
    db.session.delete(blog)
    db.session.commit()
    
    return jsonify({"message":"Blog deleted"}), 200
    
    
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
