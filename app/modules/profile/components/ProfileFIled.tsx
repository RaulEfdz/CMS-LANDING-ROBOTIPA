import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ProfileField = ({
  label,
  value,
  editing,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string | undefined | null;
  editing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) => {
  const displayValue = value || "No especificado";
  
  return (
    <div className="space-y-2 group">
      <div className="flex items-center justify-between">
        <Label 
          className={`text-sm font-medium ${editing ? 'text-gray-900' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      
      {editing ? (
        <Input
          type={type}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder || `Introduce ${label.toLowerCase()}`}
          required={required}
          className="w-full transition-all duration-200
            border-gray-200 hover:border-gray-300
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            shadow-sm rounded-none"
        />
      ) : (
        <div className="flex items-center min-h-[2.5rem] px-3 py-2 
          bg-gray-50 border border-gray-100 rounded-none
          group-hover:border-gray-200 transition-colors duration-200">
          <p className={`text-sm ${value ? 'text-gray-900' : 'text-gray-500 italic'}`}>
            {displayValue}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileField;