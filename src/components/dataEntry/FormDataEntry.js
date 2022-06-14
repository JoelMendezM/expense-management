import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';

export const FormDataEntry = () => {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [entry, setEntry] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData =
      {
      description: event.target.description.value,
      amount: event.target.amount.value,
      date: event.target.date.value
    }

    if (entry === 'ing') {
      const ingress = {
        ...inputData,
        balance: setBalance(balance + parseInt(event.target.amount.value))
      }
      setData([...data, ingress])
    } else {
      const consume = {
        ...inputData,
        balance: setBalance(balance - parseInt(event.target.amount.value))
      }
      setData([...data, consume])
    }

    document.querySelector('#description').value = ''
    document.querySelector('#amount').value = ''
    setEntry('') 
  }

  useEffect (() => {
  }, [data, balance])
  
  console.log('data', data);

  return (
    <div>
      <h1 className='flex justify-center font-bold'>Data Entry</h1>
      <form onSubmit={handleSubmit} className='m-3'>
        {
        <div>
          <div className="inline-block relative w-64">
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-3" 
                    required
                    onChange={(e) => setEntry(e.target.value)}
                    value={entry}>
              <option value='' disabled defaultValue hidden>Select entry type</option>
              <option value='ing'>Ingress</option>
              <option value='con'>Cosume</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <input type='date' name='date' required/>
        </div>
        }
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
          <input 
          type="text"
          name='description'
          id='description'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Provide a description" 
          required />
        </div>
        <div className="mb-6">
          <label name="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Amount</label>
          <input 
          type="number"
          name='amount'
          id='amount'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
      {data.length > 0 &&
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {
                    data.map(elem =>{
                      return (
                        <>
                          <tr key={uuid()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {elem.description}
                            </th>
                            <td className="px-6 py-4">
                                {elem.amount}
                            </td>
                            <td className="px-6 py-4">
                                {elem.date}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <p className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer">Remove</p>
                            </td>
                          </tr>
                        </>
                      )
                    })
                  }
                </tbody>
            </table>
          <h1 className='flex justify-center font-bold'>{balance}</h1>
        </div>
      }
    </div>
  )
}