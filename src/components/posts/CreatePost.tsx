import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import axios from "axios"

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

export default function CreatePost() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      body: "",
    },
  })

  function reload() {
    window.location.reload();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.put(baseURL, {
      id: values.id,
      title: values.title,
      body: values.body
    })
    .then(function (response) {
      console.log(response);
      reload();
    });
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="id..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea className="max-h-56" placeholder="body..." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row-reverse">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
