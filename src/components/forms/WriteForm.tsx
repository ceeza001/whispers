import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Textarea,
} from "@/components/ui";
import { MessageValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { useWriteMessage } from "@/lib/react-query/queries";

type WriteFormProps = {
  message?: Models.Document;
  room;
};

const WriteForm = ({ message, room }: WriteFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof MessageValidation>>({
    resolver: zodResolver(MessageValidation),
    defaultValues: {
      content: message ? message?.content : "",
    },
  });

  // Query
  const { mutateAsync: writeMessage, isLoading: isLoadingWrite } =
    useWriteMessage();
  
  // Handler
  const handleSubmit = async (value: z.infer<typeof MessageValidation>) => {
    // CREATE MESSAGE
    const newMessage = await writeMessage({ 
      room, 
      content: value.content 
    });

    if (!newMessage) {
      toast({
        title: `Send message failed. Please try again.`,
      });
    }
    navigate("/profile");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Say something about me</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="w-full">
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap w-full"
            disabled={isLoadingWrite}>
            {(isLoadingWrite) && <Loader />}
            Send Message
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WriteForm;