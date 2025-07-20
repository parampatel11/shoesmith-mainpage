'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import { Country, State } from 'country-state-city'

export default function CountryStateSelector({selectedCountry,setSelectedCountry,selectedState,setSelectedState}) {
  const [stateOptions, setStateOptions] = useState([])

  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }))

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value)
      const options = states.map((state) => ({
        label: state.name,
        value: state.isoCode,
      }))
      setStateOptions(options)
    } else {
      setStateOptions([])
      setSelectedState(null)
    }
  }, [selectedCountry])

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'black',
      borderColor: '#4ED7F1',
      color: '#4ED7F1',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'black',
      color: '#4ED7F1',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#222' : 'black',
      color: '#4ED7F1',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#4ED7F1',
    }),
    input: (provided) => ({
      ...provided,
      color: '#4ED7F1',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#4ED7F1',
    }),
  }


  return (
    <div className="max-w-md mx-auto p-4 space-y-4 text-[#4ED7F1] bg-black rounded shadow-lg">
      <h2 className="text-xl font-semibold text-[#4ED7F1]">Select Country & State</h2>

      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={(val) => {
          setSelectedCountry(val);
          setSelectedState(null);
        }}
        placeholder="Select Country"
        styles={customStyles}
      />

      {selectedCountry && (
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={setSelectedState}
          placeholder="Select State"
          styles={customStyles}
        />
      )}

      {selectedCountry && selectedState && (
        <div className="mt-4 text-sm text-green-300">
          Selected: {selectedCountry.label} → {selectedState.label}
        </div>
      )}
    </div>
  )
}
