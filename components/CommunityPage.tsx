import React, { useContext, useState } from 'react';
import Card from './common/Card';
import { AppContext } from '../App';

const initialPosts = [
    { id: 1, type: 'discussion', author: 'علياء', time: 'منذ 5 دقائق', avatar: 'https://i.pravatar.cc/150?u=alia', content: 'مرحباً جميعاً، هل لدى أحدكم أي نصائح لتعلم اللغة الإنجليزية بشكل أسرع؟', likes: 12, comments: [{id: 1, author: 'محمد', text: 'أقترح استخدام تطبيقات مثل Duolingo!'}, {id: 2, author: 'نورة', text: 'مشاهدة الأفلام بدون ترجمة ساعدتني كثيراً.'}], isLiked: false },
    { id: 2, type: 'discussion', author: 'خالد', time: 'منذ 20 دقيقة', avatar: 'https://i.pravatar.cc/150?u=khaled', content: 'أنهيت للتو رسمة جديدة وأحببت أن أشاركها معكم! ما رأيكم؟ 🖼️', likes: 35, comments: [], isLiked: true },
    { id: 3, type: 'story', author: 'سارة', time: 'بالأمس', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=387&auto=format&fit=crop', content: 'أود أن أشارككم قصة نجاحي في تعلم البرمجة. بدأت من الصفر والآن لدي تطبيق صغير خاص بي! لا تستسلموا لأحلامكم.', likes: 150, comments: [], isLiked: false },
];

const CommunityPage: React.FC = () => {
    const { t, user } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState<'discussions' | 'stories'>('discussions');
    const [posts, setPosts] = useState(initialPosts);

    const handleLike = (postId: number) => {
        setPosts(posts.map(p => 
            p.id === postId ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p
        ));
    };

    const handleAddComment = (postId: number, commentText: string) => {
        if (!commentText.trim()) return;
        const newComment = { id: Date.now(), author: user?.name || 'مستخدم', text: commentText };
        setPosts(posts.map(p => 
            p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
        ));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4 order-2 lg:order-1">
                <Card className="p-4">
                    <h3 className="font-bold text-lg mb-4">{t('communityStats')}</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center"><span>{t('members')}</span><span className="font-bold text-shahd-gold">1,204</span></div>
                        <div className="flex justify-between items-center"><span>{t('topics')}</span><span className="font-bold text-shahd-gold">320</span></div>
                        <div className="flex justify-between items-center"><span>{t('successStories')}</span><span className="font-bold text-shahd-gold">88</span></div>
                    </div>
                </Card>
            </div>
            <div className="w-full lg:w-3/4 order-1 lg:order-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">{t('communityHubTitle')}</h1>
                    <div className="mt-4 sm:mt-0">
                        <div className="inline-flex items-center justify-center bg-shahd-gold-light p-1.5 rounded-full space-x-2 rtl:space-x-reverse">
                            <TabButton title={t('discussions')} isActive={activeTab === 'discussions'} onClick={() => setActiveTab('discussions')} />
                            <TabButton title={t('successStories')} isActive={activeTab === 'stories'} onClick={() => setActiveTab('stories')} />
                        </div>
                    </div>
                </div>
                
                <div className="relative">
                    <div className="space-y-4">
                      {activeTab === 'discussions' && posts.filter(p => p.type === 'discussion').map(post => <Post key={post.id} {...post} onLike={handleLike} onAddComment={handleAddComment} />)}
                      {activeTab === 'stories' && posts.filter(p => p.type === 'story').map(post => <Post key={post.id} {...post} onLike={handleLike} onAddComment={handleAddComment} />)}
                    </div>
                    <button className="fixed bottom-6 end-6 lg:absolute lg:-top-20 lg:end-0 bg-shahd-gold text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-amber-600 transition-transform transform hover:scale-110">
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{ title: string, isActive: boolean, onClick: () => void }> = ({ title, isActive, onClick }) => (
    <button onClick={onClick} className={`px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full focus:outline-none ${isActive ? 'bg-white text-shahd-gold shadow-md' : 'text-shahd-accent hover:bg-white/70'}`}>
        {title}
    </button>
);

const Post: React.FC<typeof initialPosts[0] & { onLike: (id: number) => void; onAddComment: (id: number, text: string) => void; }> = 
({ id, author, time, content, avatar, likes, comments, isLiked, onLike, onAddComment }) => {
    const [showComments, setShowComments] = useState(false);
    return (
        <Card className="p-4">
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                        <p className="font-bold">{author}</p>
                        <p className="text-xs text-gray-500">{time}</p>
                    </div>
                    <p className="mt-1 text-gray-700 whitespace-pre-wrap">{content}</p>
                    <div className="flex space-x-4 rtl:space-x-reverse mt-3 text-gray-500 text-sm">
                        <button onClick={() => onLike(id)} className={`flex items-center space-x-1 rtl:space-x-reverse transition-colors ${isLiked ? 'text-shahd-gold' : 'hover:text-shahd-gold'}`}>
                            <span className={`transform transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`}>👍</span>
                            <span className="font-semibold">{likes}</span>
                        </button>
                        <button onClick={() => setShowComments(!showComments)} className="hover:text-shahd-gold flex items-center space-x-1 rtl:space-x-reverse">
                            <span>💬</span>
                            <span className="font-semibold">{comments.length}</span>
                        </button>
                    </div>
                </div>
            </div>
            {showComments && <CommentSection comments={comments} onAddComment={(text) => onAddComment(id, text)} />}
        </Card>
    );
}

const CommentSection: React.FC<{ comments: {id: number, author: string, text: string}[], onAddComment: (text: string) => void }> = ({ comments, onAddComment }) => {
    const { t } = useContext(AppContext);
    const [newComment, setNewComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddComment(newComment);
        setNewComment("");
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-3">
                {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-2 text-sm">
                        <span className="font-bold text-gray-800">{comment.author}: </span>
                        <span className="text-gray-600">{comment.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex space-x-2 rtl:space-x-reverse">
                <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={t('commentPlaceholder')} 
                    className="flex-1 p-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-shahd-gold-light" 
                />
                <button type="submit" className="px-4 py-2 bg-shahd-gold text-white font-semibold rounded-full text-sm hover:bg-amber-600 transition-colors">
                    {t('postComment')}
                </button>
            </form>
        </div>
    );
};

export default CommunityPage;