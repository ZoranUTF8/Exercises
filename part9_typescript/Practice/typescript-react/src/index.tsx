import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


interface WelcomeProps {
  name: string;
}

// There is actually no need to define the return type of a React component since the TypeScript compiler infers the type automatically, and we can just write
// So this const Welcome = ({ name }: { name: string }): JSX.Element => {
// becomes this
//

const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};


/* We used a type assertion for the return value of the function document.getElementById
We need to do this since the ReactDOM.createRoot takes an HTMLElement as a parameter but
the return value of function document.getElementById has the following type
HTMLElement | null
since if the function does not find the searched element, it will return null.
Earlier in this part we warned about the dangers of type assertions, but in our case the assertion
is ok since we are sure that the file index.html indeed has this particular id and the function is
always returning a HTMLElement.
*/
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Welcome name="Zochan" />
)

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
