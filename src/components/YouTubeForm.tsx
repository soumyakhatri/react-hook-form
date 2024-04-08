import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};
let renderCount = 0;

function YouTubeForm() {
  const form = useForm<FormValues>();

  const { register, control, handleSubmit, formState } = form;
  renderCount++;
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };
  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label className="label" htmlFor="username">
            User Name
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
              validate: {
                notAllowed: (fieldValue) => fieldValue !== "admin@mail.com" || "Enter a different email id",
                notBlackListed: (fieldValue) => !fieldValue.endsWith("baddomain.com") || "Domain name not supported",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="channel">
            Channel
          </label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
        <DevTool control={control} />
      </form>
    </div>
  );
}

export default YouTubeForm;
