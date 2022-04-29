import {useState} from "react";
import {FormikProvider, useFormik} from "formik";
import {calcEquation} from "./calcEquation";
import taskImg from "../../../images/lab-5/task.png";
import {readFile} from "../../utils/uploadFile";
import {AppFormGroup} from "../../components/AppFormGroup";
import {AppField} from "../../components/AppField";
import {AppButton} from "../../components/AppButton";

export function Lab5() {
  const [result, setResult] = useState('');
  const [formValue, setFormValue] = useState({
    a11: '',
    a21: '',
    a31: '',
    a12: '',
    a22: '',
    a32: '',
    a13: '',
    a23: '',
    a33: '',
    b1: '',
    b2: '',
    b3: ''
  });

  const formik = useFormik({
    initialValues: formValue,
    enableReinitialize: true,
    onSubmit: (vals) => {
      if (Object.values(vals).includes('')) return alert('Не всі дані введені!');
      const [x1, x2, x3] = calcEquation(vals);

      setResult({ x1, x2, x3 });
    },
  });
  return (
    <FormikProvider value={formik}>
      <div className="flex gap-10">
        <div  className="grow">
          <h1 className="text-center font-bold text-xl">Лабораторна робота № 5</h1>
          <p className="mt-2"><strong>Тема:</strong> «Розв’язання систем лінійних алгебраїчних рівнянь».</p>
          <p className="mt-2"><strong>Варіант №8</strong></p>
          <div className="mt-4">
            <p className="text-lg">Завдання:</p>
            <img className="mt-2" src={taskImg} alt="task"/>
          </div>
          <hr />
          <form onSubmit={formik.handleSubmit} className="mt-2">
            <div className='flex justify-center items-center w-5/6 mx-auto'>
              <div className='grid grid-cols-3 grid-rows-3 gap-3'>
                {Object.keys(formik.values)
                  .filter((el) => !el.includes('b'))
                  .map((el, i) => {
                    return (
                      <div className='flex justify-between' key={el}>

                        <AppFormGroup>
                          <AppField
                            {...formik.getFieldProps(el)}
                            placeholder={`Введіть а${el.slice(1)}`} type="number" />
                        </AppFormGroup>

                        <span className='flex items-center justify-center text-bold mx-2 w-1/3'>
                  {' '}
                          * X{`${el.slice(-1)}`}
                          {['1', '2'].includes(el.slice(-1)) && ' + '}
                  </span>
                      </div>
                    );
                  })}
              </div>
              <div className='grid grid-cols-1 grid-rows-3 gap-3'>
                {Object.keys(formik.values)
                  .filter((el) => !el.includes('a'))
                  .map((el, i) => {
                    return (
                      <div className='flex justify-between' key={el}>
                    <span className='flex items-center justify-center text-bold mr-2 w-1/5'>
                    {' '}
                      ={' '}
                  </span>
                        <AppFormGroup>
                          <AppField
                            {...formik.getFieldProps(el)}
                            placeholder={`Введіть b${el.slice(1)}`} type="number" />
                        </AppFormGroup>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='mt-8 flex flex-col gap-8 items-center'>
              <p>або</p>
              <AppButton type='button'>
                <label htmlFor='fileInput'>
                  Виберіть файл
                  <input
                    id='fileInput'
                    type='file'
                    accept='.txt'
                    onChange={(e) => readFile(e, setFormValue)}
                    placeholder='Виберіть файл...'
                    hidden
                  />
                </label>
              </AppButton>
              {result ? (
                <ul className='text-lg font-bold'>
                  <li>Х1 = {+result.x1.toFixed(4)}</li>
                  <li>Х2 = {+result.x2.toFixed(4)}</li>
                  <li>Х3 = {+result.x3.toFixed(4)}</li>
                </ul>
              ) : null}
              <AppButton type='submit'>
                Результат!
              </AppButton>
              <hr className='bg-black w-full' />
            </div>
          </form>
        </div>
      </div>
    </FormikProvider>
  );
}
