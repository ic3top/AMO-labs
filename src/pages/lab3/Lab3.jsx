import taskImg from '/images/lab-3/task-3.png';
import {Graph} from "./Graph";

export const Lab3 = () => {

  return (
    <div className="flex gap-10">
      <div  className="grow">
        <h1 className="text-center font-bold text-xl">Лабораторна робота № 3</h1>

        <p className="mt-2"><strong>Тема:</strong>«Інтерполяція функції».</p>
        <p className="mt-2"><strong>Варіант №8</strong></p>

        <div className="mt-4">
          <p className="text-lg">Завдання:</p>
          <img className="mt-2" src={taskImg} alt="task"/>
        </div>
        <h2 className="text-center font-bold text-lg mt-2">Інтерполяція многочленом Ньютона для sin(x)</h2>
        <Graph formula="sin"/>

        <h2 className="text-center font-bold text-lg mt-2">Інтерполяція многочленом Ньютона для cos(x+cos <sup>3</sup> x)</h2>
        <Graph formula="var"/>
      </div>
    </div>
  )
}
