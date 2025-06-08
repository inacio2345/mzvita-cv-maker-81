
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const countries = [
  { code: '+258', country: 'Moçambique', flag: '🇲🇿', mask: '## ### ####' },
  { code: '+244', country: 'Angola', flag: '🇦🇴', mask: '### ### ###' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', mask: '### ### ###' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷', mask: '## #####-####' },
  { code: '+27', country: 'África do Sul', flag: '🇿🇦', mask: '## ### ####' }
];

const PhoneInput = ({ value, onChange, error, required }: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (number: string, mask: string) => {
    const digits = number.replace(/\D/g, '');
    let formatted = '';
    let digitIndex = 0;

    for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
      if (mask[i] === '#') {
        formatted += digits[digitIndex];
        digitIndex++;
      } else {
        formatted += mask[i];
      }
    }

    return formatted;
  };

  const handlePhoneChange = (newNumber: string) => {
    const digits = newNumber.replace(/\D/g, '');
    const formatted = formatPhoneNumber(digits, selectedCountry.mask);
    setPhoneNumber(formatted);
    onChange(`${selectedCountry.code} ${formatted}`);
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      const formatted = formatPhoneNumber(phoneNumber.replace(/\D/g, ''), country.mask);
      setPhoneNumber(formatted);
      onChange(`${country.code} ${formatted}`);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone">
        Telefone {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex gap-2">
        <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-32">
            <SelectValue>
              <div className="flex items-center gap-2">
                <span>{selectedCountry.flag}</span>
                <span className="text-sm">{selectedCountry.code}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.code}</span>
                  <span className="text-sm text-gray-500">{country.country}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="phone"
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder={selectedCountry.mask.replace(/#/g, '9')}
          className={`flex-1 ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <p className="text-xs text-gray-500">
        Formato: {selectedCountry.code} {selectedCountry.mask.replace(/#/g, '9')}
      </p>
    </div>
  );
};

export default PhoneInput;
