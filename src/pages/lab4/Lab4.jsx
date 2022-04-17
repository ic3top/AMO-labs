import taskImg from '/images/lab-4/task.png';
import {Form, Formik, isNaN} from "formik";
import {AppFormGroup} from "../../components/AppFormGroup";
import {AppLabel} from "../../components/AppLabel";
import {AppField} from "../../components/AppField";
import {AppButton} from "../../components/AppButton";
import {useState} from "react";
import {readFile} from "../../utils/uploadFile";
import {draw_graph, getResult} from "./utils";
import {HorizontalGridLines, LineSeries, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from "react-vis";

export const Lab4 = () => {
  const [data, setData] = useState([]);
  const [tangent, setTangent] = useState([]);
  const [result, setResult] = useState({});
  const [formValue, setFormValue] = useState({ a: '', b: '', e: '' })

  return (
    <div className="flex gap-10">
      <div  className="grow">
        <h1 className="text-center font-bold text-xl">Лабораторна робота № 4</h1>

        <p className="mt-2"><strong>Тема:</strong> «Розв’язання нелінійних рівнянь на комп’ютері».</p>
        <p className="mt-2"><strong>Варіант №8</strong></p>

        <div className="mt-4">
          <p className="text-lg">Завдання:</p>
          <img className="mt-2" src={taskImg} alt="task"/>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={formValue}
          onSubmit={({ a, b, e }) => {
            if (!a || !b || !e) { return alert('Значення не задано.') }
            if (isNaN(a) || isNaN(b) || isNaN(e)) { return alert('Задайте тільки числа.') }

            const [count, x] = getResult(a, b, e);
            const [dataArr, tangentArr] = draw_graph();
            setData(dataArr);
            setTangent(tangentArr);
            setResult({ x, count });
          }}
        >
          <Form className="border p-2">
            <h2 className="text-center my-2 text-xl">Задайте відповідні значення у формі:</h2>

            <div className="flex flex-col justify-center gap-5 items-center">
              <div className="flex justify-between gap-5">
                <AppFormGroup>
                  <AppLabel htmlFor="a">Значення a:</AppLabel>
                  <AppField  className="w-full p-1" id="a" name="a" placeholder="a" type="number" />
                </AppFormGroup>

                <AppFormGroup>
                  <AppLabel htmlFor="b">Значення b:</AppLabel>
                  <AppField  className="w-full p-1" id="b" name="b" placeholder="b" type="number" />
                </AppFormGroup>

                <AppFormGroup>
                  <AppLabel htmlFor="e">Значення e:</AppLabel>
                  <AppField  className="w-full p-1" id="e" name="e" placeholder="e" type="number" />
                </AppFormGroup>
              </div>
              <span className="font-bold">or choose file</span>
              <div className="mt-2">
                <input type="file" id="files" name="files[]" multiple onChange={(e) => readFile(e, setFormValue)} />
              </div>

              <AppButton className="mt-2" type="submit">Solve</AppButton>

              <hr className='bg-black w-full' />

              {result.x ? (
                <div className='text-lg'>
                  х = {result.x.toFixed(3)} <br />
                  Кількість ітерацій: {result.count}
                </div>
              ) : null}
            </div>
          </Form>
        </Formik>
        {data.length ? (
          <div className='flex justify-center mt-4'>
            <XYPlot width={450} height={450}>
              <XAxis />
              <YAxis />
              <HorizontalGridLines />
              <VerticalGridLines />
              <LineSeries data={data} color='red' style={{ strokeLinejoin: 'round' }} />
              <MarkSeries data={tangent} color='green' style={{ fontSize: 'bold' }} />
            </XYPlot>
          </div>
        ) : null}
      </div>
    </div>
  )
}
