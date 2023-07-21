import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const baseURL = "https://tafmt3r5ff.execute-api.eu-north-1.amazonaws.com/dev/posts"

const formSchema = z.object({
  id: z.string().min(1, {
    message: "Id must be at least 1 character.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
})

export default function Post() {

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    loadPost();
  }, [])

  function loadPost() {
    axios.get(`${baseURL}/${id}`).then(response => {
      const post = response.data;
      setTitle(post.title);
      setBody(post.body);
    })
  }

  function deletePost() {
    axios.delete(`${baseURL}/${id}`)
  }

  function reload() {
    window.location.reload();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function updatePost(values: z.infer<typeof formSchema>) {
    axios.put(`${baseURL}`, {
      id: values.id,
      title: values.title,
      body: values.body
    })
    .then(function (response) {
      console.log(response);
    });
    setTimeout(reload,500);
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card>
        <CardHeader className="text-xl">{title}</CardHeader>
        <CardContent>{body}</CardContent>
        <CardFooter className="space-x-2">
          <Button variant={"outline"} asChild><Link to="/">Back</Link></Button>
          <Dialog>
          <DialogTrigger>
           <Button variant={"secondary"}>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit post</DialogTitle>
              <DialogDescription>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(updatePost)} className="space-y-4">
                  < FormField
                      control={form.control}
                      name="id"
                      defaultValue={id}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="hidden" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      defaultValue={title}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="body"
                      defaultValue={body}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body</FormLabel>
                          <FormControl>
                            <Textarea className="max-h-56" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row-reverse">
                      <Button type="submit">Update post</Button>
                    </div>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild><Button variant={"destructive"}>Delete</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the post
                and remove the data from the server.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant={"destructive"} onClick={() => deletePost()}><Link to="/">Delete</Link></Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
