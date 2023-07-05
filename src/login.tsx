import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeEventHandler, FormEvent,useEffect,useState } from "react";
import { Link, useNavigate  } from "react-router-dom";


export default function Login(){


     const navigation = useNavigate();
    useEffect(()=>{
        const authToken = localStorage.getItem('authToken');
        if(authToken){
            navigation('/form');
        }
    })

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

   
    const [errors, setErrors] = useState<string[]>([]);

    const handleEmailChange:ChangeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const input = e.target as HTMLInputElement;
        setEmail(input.value);
    }
    const handlePasswordChange:ChangeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const input = e.target as HTMLInputElement;
        setPassword(input.value);
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const body = {email, password};
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setErrors(_errors=>[]);

    if(!email || !password){

      
        if (!email){
            setErrors(errors=>[...errors, 'Email cannot be empty'])
        }
        if (!password){
            setErrors(errors=>[...errors, 'Password cannot be empty'])
        }
        return;
    }

    axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login',body)
    .then((res:AxiosResponse)=>{
        console.log(res);
        localStorage.setItem('authToken', res.data.authToken);
        setErrors(e=>[...e, 'Successful Form submission']);
        navigation('/form');
    })
    .catch((err:AxiosError)=>{
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = err.response?.data as any;
        const msg:string = error.message;
        setErrors(errors=>[...errors, msg]);
    })

        
    }
    return (
        <div className="flex bg-indigo-100 justify-center items-center h-[100vh] ">
            <div className=" p-8 bg-white rounded-lg h-84 w-96" >
                <h1 className="text-3xl font-bold border-b-2 py-2 text-center border-black">Login</h1>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="p-2 flex flex-col gap-2">
                        <label className="font-semibold text-blue-600 text-lg" htmlFor="email">Email <span >*</span></label>
                        <input required placeholder="abc@example.com" type='email' className=" rounded-md bg-slate-100 text-slate-700 border-2 text-xl border-indigo-300 px-2 outline-none invalid:border-red-500 valid:border-green-500" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div className="p-2 flex flex-col gap-2" >
                        <label className="font-semibold text-blue-700  text-lg" htmlFor="password">Password</label>
                        <input required type='password' placeholder="Abcd@123" className=" rounded-md bg-slate-100 text-slate-700 border-2 text-xl border-indigo-300 px-2 outline-none invalid:border-red-500 valid:border-green-500" value={password} onChange={handlePasswordChange}/>
                    </div>
                    {errors.length>0 && errors.map(err=>(<li key={err}>{err}</li>))}
                    <button className="rounded-lg border-2 my-2 mx-auto self-center px-4 py-2 w-4/5 border-cyan-200 bg-purple-700 text-white text-xl font-semibold hover:bg-black transition hover:border-cyan-600 active:bg-indigo-400">Login </button>
                    <p className="text-center text-blue-700 underline border-t-2 border-black pt-2 "><Link to='/forgot' > Forgot Password? </Link> </p>
                </form>
            </div>
        </div>
    )
}