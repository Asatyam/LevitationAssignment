/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEventHandler, FormEvent,useState } from "react";


export default function Forgot(){

    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const [errors, setErrors] = useState<string[]>([]);

    const handleConfirmChange:ChangeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const input = e.target as HTMLInputElement;
        setConfirm(input.value);

        if(input.value !== password){
            setErrors(_e=>[ 'Passwords do not match']);
        }
        else{
            setErrors([]);
        }
    }
    const handlePasswordChange:ChangeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const input = e.target as HTMLInputElement;
        setPassword(input.value);

    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if (confirm !== password){
                    setErrors(_errors=>['Passwords do not match']);
                    return;

        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setErrors(_errors=>['Password changed succesfully']);


    }
    return (
        <div className="flex bg-indigo-100 justify-center items-center h-[100vh] ">
            <div className=" p-8 bg-white rounded-lg h-84 w-96" >
                <h1 className="text-3xl font-bold border-b-2 py-2 text-center border-black">Forgot Password</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="p-2 flex flex-col gap-2" >
                        <label className="font-semibold text-blue-700  text-lg" htmlFor="password">New Password</label>
                        <input required type='password' placeholder="Abcd@123" className=" rounded-md bg-slate-100 text-slate-700 border-2 text-lg border-indigo-300 px-2 outline-none invalid:border-red-500 valid:border-green-500" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div className="p-2 flex flex-col gap-2" >
                        <label className="font-semibold text-blue-700  text-lg" htmlFor="confirm">Confirm New Password</label>
                        <input required type='password'  className=" rounded-md bg-slate-100 text-slate-700 border-2 text-lg border-indigo-300  px-2 outline-none invalid:border-red-500 valid:border-green-500" value={confirm} onChange={handleConfirmChange}/>
                    </div>
                    
                    
                    {errors.length>0 && errors.map(err=>(<li key={err}>{err}</li>))}
                    <button className="rounded-lg border-2 my-2 mx-auto self-center px-4 py-2 w-4/5 border-cyan-200 bg-purple-700 text-white text-xl font-semibold hover:bg-black transition hover:border-cyan-600 active:bg-indigo-400">Change </button>
                </form>
            </div>
        </div>
    )
}