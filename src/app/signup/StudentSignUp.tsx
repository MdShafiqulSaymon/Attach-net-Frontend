import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import AttachNetLogo from "../components/AttachNetLogo";
import SingUpForm from "../components/SignUpForm";

export default function StudentSignUp(){
    return(
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="welcome pb-5 w-4/5 bg-transparent flex flex-col rounded-lg border-2">
        <div className="w-full flex flex-col gap-8 items-center pt-8">
          {/* Modern Tech Logo */}
          <AttachNetLogo/>
          <Text
            text="Sign Up"
            gradient="from-blue-500 via-purple-500 to-indigo-500"
            className="text-4xl font-bold"
          />
          
          <SingUpForm/>
        </div>
      </div>
    </div>
    )
}