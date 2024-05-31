import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react";
import { useEditUserMutation } from "../../redux/user/userApi";
import { signInSuccess } from "../../redux/user/userslice";
import { useDispatch } from "react-redux";


export function DialogDemo({ currentUser }) {

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const fileInputRef = useRef(null);


  const [formData, setFormData] = useState({
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    imgUrl: currentUser.imgUrl,
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedAvatar(file);
    setFormData({ ...formData, imgUrl: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("id", formData.id);
    form.append("imgUrl", selectedAvatar);

    try {
      const data = await editUser(form);
      if (data.data.status) {
        const userData = data.data.userData;

        dispatch(signInSuccess(userData));

        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="">
        <Button variant="outline" className="border-black">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-white padd">Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">

            <div>
              <input type="file" accept="image/*" onChange={handleAvatarChange} ref={fileInputRef} style={{ display: 'none' }} name="imgUrl" />
              <div className="avatar cursor-pointer bg-cover"
                onClick={handleAvatarClick}
              >

                {console.log(currentUser.imgUrl, "++++++++++++++++")}

                <img
                  alt="img"
                  src={currentUser.imgUrl ? `/userImages/${currentUser.imgUrl}` : `/userImages/user.png`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />


              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-3 pr-3">
              <Label htmlFor="username" className="text-center">Name</Label>
              <Input
                id="username"
                name="name"

                value={formData.name}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3 pr-3">
              <Label htmlFor="email" className="text-center">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}