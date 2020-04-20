import React from 'react'

export default function SelectDataKey({onChange}) {
    return (
        <>
          <label htmlFor="key-select">Select a key for sorting：</label>  
          <select name="" onChange={onChange} id="key-select">
              <option value="cases">Cases</option>
              <option value="todayCases">Today Cases</option>
              <option value="deaths">Death</option>
              <option value="recovered">Recovered</option>
              <option value="active">Active</option>
          </select>
        </>
    )
}
