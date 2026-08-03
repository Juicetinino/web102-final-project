import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../useAuth';

function formatDate(dateString) {
    return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

function Reply({ reply, onUpdated, onDeleted }) {
    const { profile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [body, setBody] = useState(reply.body);
    const isOwner = profile && profile.id === reply.user_id;

    async function handleSave() {
        const { error } = await supabase.from('replies').update({ body }).eq('id', reply.id);
        if (!error) {
            onUpdated({ ...reply, body });
            setEditing(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm('Delete this reply?')) return;
        const { error } = await supabase.from('replies').delete().eq('id', reply.id);
        if (!error) onDeleted(reply.id);
    }

    return (
        <div className="widget post">
            <div className="post-info">
                <p>Posted by {reply.username}</p>
                <p>{formatDate(reply.created_at)}</p>
            </div>
            {editing ? (
                <>
                    <textarea
                        className="full-width"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <div className="post-actions">
                        <button onClick={handleSave}>Save</button>
                        <button className="secondary" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <p>{reply.body}</p>
            )}
            {isOwner && !editing && (
                <div className="post-actions">
                    <button className="secondary" onClick={() => setEditing(true)}>Edit</button>
                    <button className="secondary" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Reply;
