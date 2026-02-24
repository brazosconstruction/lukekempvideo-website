import { useState, useEffect } from 'react';
import { Play, ExternalLink, Calendar } from 'lucide-react';

const LatestProjects = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YouTube API configuration
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const fetchLatestVideos = async () => {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      setError('YouTube API not configured');
      setLoading(false);
      return;
    }

    try {
      // Fetch latest 6 videos from the channel
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`
      );
      
      if (!response.ok) throw new Error('Failed to fetch videos');
      
      const data = await response.json();
      
      // Get video details including duration and view count
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics`
      );
      
      const detailsData = await detailsResponse.json();
      
      // Combine data
      const videosWithDetails = data.items.map((item, index) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        duration: detailsData.items[index]?.contentDetails.duration,
        viewCount: detailsData.items[index]?.statistics.viewCount
      }));
      
      setVideos(videosWithDetails);
    } catch (err) {
      console.error('YouTube API Error:', err);
      setError('Failed to load latest projects');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    const match = duration.match(/PT(\d+M)?(\d+S)?/);
    const minutes = (match[1] || '').slice(0, -1) || '0';
    const seconds = (match[2] || '').slice(0, -1) || '0';
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const formatViewCount = (count) => {
    if (!count) return '';
    const num = parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
    return `${num} views`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
              Latest Projects
            </h2>
            <p className="text-brand-cream/80 text-lg max-w-2xl mx-auto mb-16">
              Loading recent work...
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-brand-cream/5 rounded-lg animate-pulse">
                  <div className="aspect-video bg-brand-cream/10 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-brand-cream/10 rounded mb-2"></div>
                    <div className="h-3 bg-brand-cream/10 rounded mb-4"></div>
                    <div className="h-3 bg-brand-cream/10 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
              Latest Projects
            </h2>
            <p className="text-brand-cream/60 text-lg">
              Recent work updates coming soon...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-cream mb-4">
            Latest Projects
          </h2>
          <p className="text-brand-cream/80 text-lg max-w-2xl mx-auto">
            See what I've been working on recently. New videos automatically appear here when published.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group bg-brand-cream/5 rounded-lg overflow-hidden hover:bg-brand-cream/10 transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-brand-gold" />
                </div>
                
                {/* Duration badge */}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-brand-cream font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-brand-cream/70 text-sm mb-4 line-clamp-2">
                  {video.description.substring(0, 120)}...
                </p>
                
                <div className="flex items-center justify-between text-xs text-brand-cream/50">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {video.publishedAt}
                  </div>
                  <div>
                    {formatViewCount(video.viewCount)}
                  </div>
                </div>
                
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 transition-colors text-sm font-medium"
                >
                  Watch on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={`https://youtube.com/channel/${CHANNEL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-8 py-3 rounded-lg font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105"
          >
            View All Projects <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestProjects;