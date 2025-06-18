import React from 'react'
import { Button } from '../ui/button'
import { Velustro } from 'uvcanvas'

interface BasicCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const BasicCard: React.FC<BasicCardProps> = ({
  title = "Tailwind card",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis ligula.",
  buttonText = "Read More",
  onButtonClick
}) => {
  return (
    <div className="relative flex w-80 flex-col rounded-none bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-none bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <Velustro />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Button className='rounded-none' onClick={onButtonClick} variant="default">
          {buttonText}
        </Button>
      </div>
    </div>
  )
}