import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import Post from '../components/Post';
import { supabase } from '../supabaseClient';
import { useAuth } from '../useAuth';

const CATEGORY_TITLES = {
    recommendation: 'Recommendations',
    spoiler: 'Spoiler Central',
};

function Feed() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const { profile } = useAuth();

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchPosts() {
            setLoading(true);

            let query = supabase.from('posts').select('*');
            if (category) query = query.eq('category', category);
            query = query.order(sortBy === 'top' ? 'upvotes' : 'created_at', { ascending: false });

            const { data: postsData, error } = await query;
            if (error || cancelled) return;

            const userIds = [...new Set(postsData.map((post) => post.user_id).filter(Boolean))];
            const { data: profilesData } = userIds.length
                ? await supabase.from('profiles').select('id, username').in('id', userIds)
                : { data: [] };
            const usernameById = Object.fromEntries((profilesData ?? []).map((p) => [p.id, p.username]));

            if (!cancelled) {
                setPosts(postsData.map((post) => ({ ...post, username: usernameById[post.user_id] ?? 'Unknown' })));
                setLoading(false);
            }
        }

        fetchPosts();
        return () => { cancelled = true; };
    }, [category, sortBy]);

    const visiblePosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="content-container">
            <div className="feed">
                <h1>{CATEGORY_TITLES[category] ?? 'Everything'}</h1>
                {profile ? (
                    <Link to="/new-post">
                        <button className="full-width">+ Make a post</button>
                    </Link>
                ) : (
                    <Link to="/log-in">
                        <button className="full-width">Log in to make a post</button>
                    </Link>
                )}
                <div className="controls-row">
                    <input
                        type="text"
                        placeholder="Search posts by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="full-width"
                    />
                    <button
                        className={sortBy === 'newest' ? 'selected' : 'secondary'}
                        onClick={() => setSortBy('newest')}
                    >
                        Newest
                    </button>
                    <button
                        className={sortBy === 'top' ? 'selected' : 'secondary'}
                        onClick={() => setSortBy('top')}
                    >
                        Most upvoted
                    </button>
                </div>
                {loading && <p className="paragraph">Loading posts...</p>}
                {!loading && visiblePosts.length === 0 && <p className="paragraph">No posts found.</p>}
                {visiblePosts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
