import { useState } from "react"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SigninMini = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const [errorMessage, setErrorMessage] = useState("");

  // Query
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const session = await signInAccount(user);

      if (!session) {
        toast({ title: "Login failed. Please try again." });
        return;
      }

      setErrorMessage(""); // Reset error message if successful login
      const isLoggedIn = await checkAuthUser();
      console.log(isLoggedIn);

      if (isLoggedIn) {
        form.reset();
      } else {
        toast({ title: "Login failed. Please try again." });
      }
    } catch (error) {
      // Use assertion to tell TypeScript the type of error
      setErrorMessage((error as Error)?.message || "Unknown error");
      toast({ title: (error as Error)?.message || "Unknown error" });
    }
  };

  return (
    <Form {...form}>
      <div className="p-[1rem] sm:max-w-420 flex-center flex-col">
        
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        {!errorMessage ?
          <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back! Please enter your details.
          </p>
        :
          <p className="text-red text-center mx-auto small-medium md:base-regular mt-2">
            {errorMessage}
          </p>
        }
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

        </form>
      </div>
    </Form>
  );
};

export default SigninMini;