import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useToast } from "@/components/ui/use-toast";
import { Textarea, Input, Button } from "@/components/ui";
import { Loader } from "@/components/shared";

import { RoomValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useCreateGroup } from "@/lib/react-query/queries";

const CreateRoom = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const form = useForm<z.infer<typeof RoomValidation>>({
    resolver: zodResolver(RoomValidation),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  // Queries
  const { mutateAsync: createGroup, isLoading: isCreatingGroup } = useCreateGroup();
  
  // Handler
  const handleCreateGroup = async (group: z.infer<typeof RoomValidation>) => {
    const newGroup = await createGroup({
      ...group,
      userId: user.id,
    });

    if (!newGroup) {
      toast({
        title: `Create community failed. Please try again.`,
      });
    } else if (newGroup) {
      navigate(0);
    }
  };
  
  return (
  		<Dialog>
        <DialogTrigger
          className="profile-tab rounded-lg ">
          <img
            src={"/assets/icons/add.svg"}
            alt="like"
            width={20}
            height={20}
          />
          Create room
        </DialogTrigger>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h4 className="h2-bold mt-2">Create Room</h4>
              <p className="small-regular my-2">Provide basic details about your chatroom, these details can't be changed</p>
            </DialogTitle>
          <DialogDescription className="my-2 text-left">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateGroup)}
                className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">
                        Choose a name that embodies your community's spirit!
                      </FormLabel>
                      <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500">
                        Share the magic of your community! Describe its purpose and what makes it a welcoming, engaging space for its members.
                      </FormLabel>
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

                <div className="flex gap-4 items-center justify-end">
                  <DialogTrigger>
                    <Button
                      type="button"
                      className="shad-button_dark_4"
                    >
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger>
                    <Button
                      type="submit"
                      className="shad-button_primary whitespace-nowrap"
                    >
                      Create
                    </Button>
                  </DialogTrigger>
                </div>
              </form>
            </Form>
              
          </DialogDescription>
        </DialogHeader>
        </DialogContent>
      </Dialog>
    
  )
}

export default CreateRoom