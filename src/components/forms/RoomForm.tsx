import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Button,
  Input,
} from "@/components/ui";
import { RoomMessageValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { Loader } from "@/components/shared";
import { useWriteRoomMessage } from "@/lib/react-query/queries";

type RoomFormProps = {
  message?: Models.Document;
  room: string;
};

const RoomForm = ({ message, room }: RoomFormProps) => {
  const { toast } = useToast();
  const { user } = useUserContext();
  
  const form = useForm<z.infer<typeof RoomMessageValidation>>({
    resolver: zodResolver(RoomMessageValidation),
    defaultValues: {
      content: message ? message?.content : "",
    },
  });

  // Query
  const { mutateAsync: writeRoomMessage, isPending: isLoadingWrite } =
    useWriteRoomMessage();

  // Handler
  const handleSubmit = async (value: z.infer<typeof RoomMessageValidation>) => {
    form.reset();
    // CREATE MESSAGE
    const newMessage = await writeRoomMessage({ 
      room, 
      content: value.content,
      sender: user.id
    });

    if (!newMessage) {
      toast({
        title: `Send message failed. Please try again.`,
      });
    }
  };

  return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full px-[0.2rem] flex items-center justify-between rounded-lg border-[1px] border-gray-500">
            <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="shad-room-input"
                    placeholder="Type your message here..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

            <Button
              type="submit"
              className="shad-button_primary"
              disabled={isLoadingWrite}>
              {(isLoadingWrite) && <Loader />}
              Send
            </Button>
        </form>
      </Form>
  );
};

export default RoomForm;