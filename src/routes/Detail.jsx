import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import Reply from '../components/Reply';
import UpArrow from '../assets/UpArrow.svg';
import { supabase } from '../supabaseClient';
import { useAuth } from '../useAuth';

function formatDate(dateString) {
    return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

function Detail() {
    const { id } = useParams();
    const { profile } = useAuth();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [writingReply, setWritingReply] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const { data: postData } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();

            if (!postData) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            const { data: authorData } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', postData.user_id)
                .maybeSingle();

            const { data: repliesData } = await supabase
                .from('replies')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: true });

            const userIds = [...new Set((repliesData ?? []).map((r) => r.user_id).filter(Boolean))];
            const { data: profilesData } = userIds.length
                ? await supabase.from('profiles').select('id, username').in('id', userIds)
                : { data: [] };
            const usernameById = Object.fromEntries((profilesData ?? []).map((p) => [p.id, p.username]));

            setPost({ ...postData, username: authorData?.username ?? 'Unknown' });
            setReplies((repliesData ?? []).map((r) => ({ ...r, username: usernameById[r.user_id] ?? 'Unknown' })));
            setLoading(false);
        }

        load();
    }, [id]);

    async function handleUpvote() {
        const newUpvotes = post.upvotes + 1;
        setPost({ ...post, upvotes: newUpvotes });
        await supabase.from('posts').update({ upvotes: newUpvotes }).eq('id', id);
    }

    async function handleDeletePost() {
        if (!window.confirm('Delete this post? This cannot be undone.')) return;
        await supabase.from('posts').delete().eq('id', id);
        navigate('/feed');
    }

    async function handleSubmitReply(e) {
        e.preventDefault();
        if (!replyText.trim()) return;

        const { data, error } = await supabase
            .from('replies')
            .insert({ post_id: id, body: replyText.trim(), user_id: profile.id })
            .select()
            .single();

        if (!error) {
            setReplies([...replies, { ...data, username: profile.username }]);
            setReplyText('');
            setWritingReply(false);
        }
    }

    function handleReplyUpdated(updatedReply) {
        setReplies(replies.map((r) => (r.id === updatedReply.id ? updatedReply : r)));
    }

    function handleReplyDeleted(replyId) {
        setReplies(replies.filter((r) => r.id !== replyId));
    }

    if (loading) {
        return (
            <div className="content-container">
                <div className="feed">
                    <p className="paragraph">Loading...</p>
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="content-container">
                <div className="feed">
                    <p className="paragraph">Post not found. It may have been deleted.</p>
                </div>
            </div>
        );
    }

    const isOwner = profile && profile.id === post.user_id;

    return (
        <div className="content-container">
            <div className="feed">
                <div className="detail-widget widget">
                    {post.image_url && (
                        <img className="detail-image" src={post.image_url} alt="" />
                    )}
                    <div className="detail-info">
                        <span className={`category-tag category-${post.category}`}>
                            {post.category === 'spoiler' ? 'Spoiler' : 'Recommendation'}
                        </span>
                        <h2>{post.title}</h2>
                        <div className="post-info">
                            <p>Posted by {post.username}</p>
                            <p>{formatDate(post.created_at)}</p>
                        </div>
                        {post.body && <p>{post.body}</p>}
                    </div>
                </div>
                <div className="detail-options">
                    <button className="upvotes" onClick={handleUpvote}>
                        <img src={UpArrow} alt="upvote" className="logo2" />
                        {post.upvotes}
                    </button>
                    {isOwner && (
                        <>
                            <Link to={`/new-post?edit=${post.id}`}>
                                <button className="secondary">Edit</button>
                            </Link>
                            <button className="secondary" onClick={handleDeletePost}>Delete</button>
                        </>
                    )}
                </div>

                {profile ? (
                    writingReply ? (
                        <form onSubmit={handleSubmitReply}>
                            <textarea
                                className="full-width input-height"
                                placeholder="What do you think?"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                            <button type="submit">Post reply</button>
                        </form>
                    ) : (
                        <button onClick={() => setWritingReply(true)}>Write a reply</button>
                    )
                ) : (
                    <Link to="/log-in"><button>Log in to reply</button></Link>
                )}

                {replies.map((reply) => (
                    <Reply
                        key={reply.id}
                        reply={reply}
                        onUpdated={handleReplyUpdated}
                        onDeleted={handleReplyDeleted}
                    />
                ))}
            </div>
        </div>
    );
};

export default Detail;
