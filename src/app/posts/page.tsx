'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button' // Assuming you're using shadcn/ui or similar

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export default function PostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    router.push('/login')
  }

  useEffect(() => {
    const role = localStorage.getItem('role')
    const userId = localStorage.getItem('userId')

    if (!role || (role !== 'admin' && !userId)) {
      router.push('/login')
      return
    }

    const fetchPostsAndComments = async () => {
      try {
        const [postsRes, commentsRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/comments'),
        ])
        const postsData: Post[] = await postsRes.json()
        const commentsData: Comment[] = await commentsRes.json()

        if (role === 'admin') {
          // Show ALL posts and comments
          setPosts(postsData)
          setComments(commentsData)
        } else {
          // Show only current user's posts and related comments
          const filteredPosts = postsData.filter(p => p.userId.toString() === userId)
          const filteredPostIds = filteredPosts.map(p => p.id)
          const filteredComments = commentsData.filter(c => filteredPostIds.includes(c.postId))

          setPosts(filteredPosts)
          setComments(filteredComments)
        }
      } catch (error) {
        console.error('Error fetching posts or comments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPostsAndComments()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 px-4 py-10 text-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Posts</h1>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl"
          >
            Logout
          </Button>
        </div>

        {loading ? (
          <div className="text-center text-lg font-medium">Loading...</div>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              className="mb-6 bg-white text-gray-800 border-2 border-indigo-700 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <CardHeader
                onClick={() =>
                  setSelectedPostId(selectedPostId === post.id ? null : post.id)
                }
                className="cursor-pointer"
              >
                <CardTitle className="text-xl hover:underline text-indigo-800">
                  {post.title}
                </CardTitle>
              </CardHeader>
              {selectedPostId === post.id && (
                <CardContent className="space-y-4">
                  <p>{post.body}</p>
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700">Comments:</h3>
                    {comments
                      .filter((c) => c.postId === post.id)
                      .map((comment) => (
                        <div
                          key={comment.id}
                          className="border-l-4 border-indigo-500 pl-4 py-2 mt-2 bg-gray-50 text-sm rounded"
                        >
                          <p className="font-medium text-gray-800">
                            {comment.name} <span className="text-gray-500">({comment.email})</span>
                          </p>
                          <p className="text-gray-700">{comment.body}</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
