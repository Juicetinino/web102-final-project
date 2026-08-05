import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { supabase } from '../supabaseClient';
import { useAuth } from '../useAuth';

const CATEGORY_MESSAGES = {
    recommendation: "Make a movie recommendation or request recommendations from others. Remember, all recommendation posts and replies should not reveal or discuss anything not included in the relevant movie's trailer.",
    spoiler: "Discuss any aspect of the movie you are referencing. Include the title of the movie in your post title so others know what they're getting into.",
};

function PostForm() {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');

    const [category, setCategory] = useState('recommendation');
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(!!editId);

    useEffect(() => {
        if (!profile) {
            navigate('/log-in');
            return;
        }

        if (!editId) return;

        async function loadPost() {
            const { data } = await supabase.from('posts').select('*').eq('id', editId).single();
            if (!data || data.user_id !== profile.id) {
                navigate('/feed');
                return;
            }
            setCategory(data.category);
            setTitle(data.title);
            setImageUrl(data.image_url ?? '');
            setContent(data.body ?? '');
            setLoading(false);
        }

        loadPost();
    }, [editId, profile, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            setError('You must enter a title.');
            return;
        }

        const postData = {
            title: title.trim(),
            image_url: imageUrl.trim() || null,
            body: content.trim(),
            category,
        };

        if (editId) {
            const { error: updateError } = await supabase
                .from('posts')
                .update(postData)
                .eq('id', editId);
            if (updateError) {
                setError('Something went wrong. Please try again.');
                return;
            }
            navigate(`/post-detail/${editId}`);
        } else {
            const { data, error: insertError } = await supabase
                .from('posts')
                .insert({ ...postData, user_id: profile.id })
                .select()
                .single();
            if (insertError) {
                setError('Something went wrong. Please try again.');
                return;
            }
            navigate(`/post-detail/${data.id}`);
        }
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

    return (
        <div className="content-container">
            <div className="feed">
                <h1>{editId ? 'EDIT POST' : 'MAKE A POST'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="post-type">
                        <button
                            type="button"
                            className={`recommend-button ${category === 'recommendation' ? 'selected' : ''}`}
                            onClick={() => setCategory('recommendation')}
                        >
                            Recommendation
                        </button>
                        <button
                            type="button"
                            className={`spoiler-button ${category === 'spoiler' ? 'selected' : ''}`}
                            onClick={() => setCategory('spoiler')}
                        >
                            Spoiler
                        </button>
                    </div>
                    <p className="left-aligned">{CATEGORY_MESSAGES[category]}</p>
                    <p className="paragraph">Title:</p>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="paragraph">Image URL:</p>
                    <input
                        type="text"
                        placeholder="Enter image URL (optional)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <p className="paragraph">Post content:</p>
                    <textarea
                        placeholder="What's on your mind?"
                        className="input-height full-width"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="full-width">
                        {editId ? 'Save changes' : 'Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
