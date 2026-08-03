import { Link } from 'react-router';

function formatDate(dateString) {
    return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

function Post({ post }) {
    return (
        <Link to={`/post-detail/${post.id}`} className="widget post">
            <h3>{post.title}</h3>
            <div className="post-info">
                <span className={`category-tag category-${post.category}`}>
                    {post.category === 'spoiler' ? 'Spoiler' : 'Recommendation'}
                </span>
                <p>Posted by {post.username}</p>
                <p>{formatDate(post.created_at)}</p>
                <p>{post.upvotes} upvotes</p>
            </div>
        </Link>
    );
};

export default Post;
