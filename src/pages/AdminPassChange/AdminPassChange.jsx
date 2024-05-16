
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaUserLock } from 'react-icons/fa'
import { useToasts } from 'react-toast-notifications';

const AdminPassChange = () => {
    const { addToast } = useToasts();
    const { register,handleSubmit, getValues, formState: { errors }} = useForm()
    const [hideCurrent, setHideCurrent] = useState(true);
    const [hideNew, setHideNew] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);
    const [adminData, setStudentData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setStudentData(parsedUserData);
      }
    }, []);
    const seePass = (type) => {
      switch (type) {
          case "current":
              setHideCurrent(!hideCurrent);
              break;
          case "new":
              setHideNew(!hideNew);
              break;
          case "confirm":
              setHideConfirm(!hideConfirm);
              break;
          default:
              break;
      }
  };
  const passwordFieldType = (type) => {
      switch (type) {
          case "current":
              return hideCurrent ? "password" : "text";
          case "new":
              return hideNew ? "password" : "text";
          case "confirm":
              return hideConfirm ? "password" : "text";
          default:
              return "password";
      }
  };
  const handleUpdatePassword = async (data) => {
    const newPassword = data.pass;
    const confirmNewPassword = getValues("confirmPassword");

    if (newPassword !== confirmNewPassword) {
        addToast('New password and confirm password do not match', { appearance: 'warning' })
        return;
    }

    const userPassData = {
        pass: newPassword,
    };

    try {
        const response = await fetch(`http://localhost:5000/api/update/user/${adminData?.user?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPassData),
        });

        const adminPass = await response.json();

        if (adminPass?.result?.modifiedCount === 1) {
            const updatedAdminData = {
                ...adminData,
                user: {
                    ...adminData.user,
                    pass: newPassword
                }
            };
            console.log(updatedAdminData);
            sessionStorage.setItem('userData', JSON.stringify(updatedAdminData));
            addToast('Updated password successfully', { appearance: 'success' })
            location.reload();
        } else {
            addToast(`${adminPass?.error}`, { appearance: 'error' })
        }
    } catch (error) {
        console.error('Error changing password:', error);
        addToast('fail to update password', { appearance: 'error' })
    }
};

    return (
        <div className=''>
            <div>
                <div>
                    <div className="flex justify-center mb-10 border-b-8">
                        <div className=''>
                            <FaUserLock className="ml-10 text-6xl"> </FaUserLock>
                            <h1 className="font-bold">Change Password</h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit(handleUpdatePassword)} className="mb-10">
                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">Current Password</span></label>
                            <div className="flex items-center">
                                <input
                                    type={passwordFieldType("current")}
                                    defaultValue={adminData?.user?.pass}
                                    className="w-full max-w-xs input input-bordered rounded-3xl"
                                    disabled
                                />
                                <a className='ml-2 text-2xl text-blue-800 cursor-pointer' title="See password" onClick={() => seePass("current")}><FaEye /></a>
                            </div>
                        </div>

                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">New Password</span></label>
                            <div className="flex items-center">
                                <div className="w-full">
                                    <input
                                        type={passwordFieldType("new")}
                                        {...register("pass", {
                                            required: "Filed is Required !",
                                            minLength: { value: 6, message: "Password must be 6 characters long" },
                                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl"
                                    />
                                    <small> {errors.pass && <p className='text-red-600'>{errors.pass.message}</p>}</small>
                                </div>

                                <a className='ml-2 text-2xl text-blue-800 cursor-pointer' title="See password" onClick={() => seePass("new")}><FaEye /></a>
                            </div>
                        </div>
                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">Confirm Password</span></label>
                            <div className="flex items-center">
                                <div className="w-full">
                                    <input
                                        type={passwordFieldType("confirm")}
                                        {...register("confirmPassword", {
                                            required: "Field is Required !",
                                            minLength: { value: 6, message: "Password must be 6 characters long" },
                                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl"
                                    />
                                    <small>{errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message}</p>}</small>
                                </div>

                                <a className='ml-2 text-2xl text-blue-800 cursor-pointer' title="See password" onClick={() => seePass("confirm")}><FaEye /></a>
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <input className="pt-3 pb-3 bg-blue-300 w-28 hover:text-black btn rounded-3xl" value="Update" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPassChange;