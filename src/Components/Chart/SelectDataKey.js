import React from 'react'

export default function SelectDataKey({onChange}) {
    return (
        <>
          <label hrelFor="key-select">Select a key for sorting：</label>  
          <select name="" onChange={onChange} id="key-select">
              <options value="cases">Cases</options>
              <options value="todayCases">Today Cases</options>
              <options value="deaths">Death</options>
              <options value="recovered">Recovered</options>
              <options value="active">Active</options>
          </select>
        </>
    )
}
