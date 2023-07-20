import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import CreatePost from "./CreatePost";
import axios from "axios";
import { Button } from "../ui/button";
import {Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area"
import { Link } from "react-router-dom";

const baseURL = "https://4qn88jko43.execute-api.eu-north-1.amazonaws.com/dev/posts"

export default function Posts() {
  interface DataType {
    ID: string;
    title: string;
    body: string;
    created_at: string;
  }
  const [posts, setPosts] = useState<Array<DataType>>([]);

  useEffect(() => {
    loadPosts();
  }, [])

  function loadPosts() {
    axios.get(baseURL).then(response => {
      const posts = response.data;
      setPosts(posts);
    });
  }
  
  return (
    <div className="">
      <div className="flex flex-row-reverse mb-4">
        <Dialog>
          <DialogTrigger asChild><Button>New Post!</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Create new post!</DialogTitle>
            <CreatePost/>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col">
        <Table>
          <TableCaption>A list of posts.</TableCaption>
          <ScrollArea className="h-4/6">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Body</TableHead>
              <TableHead>Created at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{post.ID}</TableCell>
                <TableCell><Link to={`/posts/${post.ID}`}>{post.title}</Link></TableCell>
                <TableCell>{post.body}</TableCell>
                <TableCell>{post.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </ScrollArea>
        </Table>
      </div>
    </div>
  )
}