/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  ChangeEventHandler,
} from 'react';
import StatusBar from './StatusBar';
import SingleInput from './SingleInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export interface FormInput {
  name: string;
  email: string;
  phone_number: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
}

export default function MainForm() {
  const initialState: FormInput = {
    name: '',
    email: '',
    phone_number: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    pincode: 0,
    country: '',
  };

  const [error, setError] = useState('');

  const navigation = useNavigate();
  const [formInput, setFormInput] = useState<FormInput>(initialState);

  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [multipleFile, setMultipleFile] = useState<FileList | null>(null);

  const [filled, setFilled] = useState<number>(0);

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(()=>{
    const authToken = localStorage.getItem('authToken');
    if(!authToken){
    navigation('/');
    }
  }
  )

  useEffect(() => {
    let identity = 0;
    let address = 0;
    let sFile = 0;
    let mFile = 0;
    function status() {

      if (formInput.name && formInput.email && formInput.phone_number) {
        identity = 1;
      }

      if (
        formInput?.address_1 &&
        formInput.address_2 &&
        formInput.pincode &&
        formInput.city &&
        formInput.country &&
        formInput.state
      ) {
        address = 1;
      }
      if (singleFile) {
        sFile = 1;
      }
      if (multipleFile) {
        mFile = 1;
      }
    }

    status();
    setFilled(identity + address + sFile + mFile);
  }, [formInput, filled, singleFile, multipleFile]);


  const [geoInput, setGeoInput] = useState('');
  

  const handleMultipleFiles: ChangeEventHandler = (e: any) => {
    if (Array.from(e.target.files).length > 5) {
      e.preventDefault();
      alert(`Cannot upload files more than 5`);
      return;
    }
    setMultipleFile(e.target.files);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const data: any = new FormData();


    for (const [key, value] of Object.entries(formInput)) {
      data.append(key, value);
    }
    if (singleFile) {
      data.append('single_file', singleFile);
    }

    let i = 1;

    if (multipleFile && multipleFile.length > 0) {
      Array.from(multipleFile).forEach((f) => {
        data.append(`multi_ups${i}`, f);
        i++;
      });
    }
    data.append('geolocation', 'fjdkfjdsfjd');

    const token = localStorage.getItem('authToken');
    const config = {
                headers:
                 {
                  Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
                 }
           }
    axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', data, config)
    .then(res=>{
      setShowSuccess(true);
    })
    .catch((err)=>{
        setError(err.response.data.message);
    });

  };

  const getGeolocation = (e:any) => {

    e.preventDefault();
    alert('Capturing location');
    setTimeout(()=>{
      setGeoInput(`${formInput.address_1}, ${formInput.address_2}, ${formInput.city}, ${formInput.state}, ${formInput.country}`);
    },3000);

    const successGeo: PositionCallback = (position: GeolocationPosition) => {
      console.log(position);
    };
    const failureGeo: PositionErrorCallback = (
      error: GeolocationPositionError
    ) => {
      console.log(error);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successGeo, failureGeo);
    }
  };


  return (
    <div className="h-[100vh] p-2 ">
      <div>
        <StatusBar filled={filled} />

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="bg-white flex flex-col gap-2 items-center">
            <h1 className="font-bold text-2xl border-b-2 w-4/5 p-2 border-black m-2">
              Personal Information
            </h1>
           
            <SingleInput
              type={'text'}
              id={'name'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'email'}
              id={'email'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'tel'}
              id={'phone_number'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <h1 className="font-bold text-2xl border-y-2 w-4/5 p-2 border-black m-2">
              Address Information
            </h1>
            <SingleInput
              type={'text'}
              id={'address_1'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'text'}
              id={'address_2'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'text'}
              id={'city'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'text'}
              id={'state'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'text'}
              id={'country'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <SingleInput
              type={'text'}
              id={'pincode'}
              formInput={formInput}
              setFormInput={setFormInput}
            />
            <h1 className="font-bold text-2xl border-y-2 w-4/5 p-2 border-black m-2">
              File Upload
            </h1>
            <div className="md:grid md:grid-cols-2  p-2 flex flex-col ">
              <label className="font-bold text-lg " htmlFor="sFile">
                Single File{' '}
                <span className="font-light text-sm ">(PNG and PDF only)</span>{' '}
              </label>
              <input
                type="file"
                id="sFile"
                accept=".png, .pdf"
                required
                className="appearance-none border-violet-400 border-2 outline-none px-2 w-72 "
                onChange={(e: any) => {
                  setSingleFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="md:grid md:grid-cols-2  p-2 flex flex-col ">
              <label className="font-bold text-lg " htmlFor="mFile">
                Multiple File{' '}
                <span className="font-light text-sm ">
                  (Upto 5)(PNG and PDF only)
                </span>{' '}
              </label>
              <input
                type="file"
                id="mFile"
                accept=".png, .pdf"
                className="appearance-none border-violet-400 border-2 outline-none px-2 w-72 "
                multiple
                required
                onChange={handleMultipleFiles}
              />
            </div>
            <h1 className="font-bold text-2xl border-y-2 w-4/5 p-2 border-black m-2">
              Geolocation
            </h1>
            <div className="md:grid md:grid-cols-2  p-2 flex flex-col ">
              <label className="font-bold text-lg " htmlFor="geoStatus">
                Geolocation status
              </label>
               <button onClick={getGeolocation}>Get geolocation</button>
              <input
                type="text"
                id="geoStatus"
                className="border-violet-400 border-2 outline-none px-2 w-72 "
                value = {geoInput}
                disabled
              />
            </div>
            {showSuccess && <p>Form was successfully submitted</p>}
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="border-2 border-cyan-400 px-4 py-2 bg-indigo-800 text-white font-bold rounded-md "
            >
              {' '}
              Submit{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
