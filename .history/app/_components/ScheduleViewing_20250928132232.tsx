import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Id } from "@/convex/_generated/dataModel"

import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'

interface ScheduleViewingProps {
  property: {
    _id: Id<"properties">;
    title: string;
  };
}

function ScheduleViewing({ property }: ScheduleViewingProps) {
    const { user } = useUser()
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const createViewing = useMutation(api.propertyViewings.createViewing)
    const [phone, setPhone] = useState('')

    const availableTimes = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedDate || !selectedTime) {
            alert("Please select date and time")
            return
        }
        if (!user) {
            alert("Please sign in")
            return
        }
        setIsSubmitting(true)

        try {
            await createViewing({
                propertyId: property._id,
                propertyTitle: property.title,
                userEmail: user.emailAddresses[0].emailAddress,
                userName: user.fullName || user.firstName || 'Unknown',
                userPhone: phone,
                viewingDate: format(selectedDate, "yyyy-MM-dd"),
                viewingTime: selectedTime,
                userId: user.id,
                message: message,
            })
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                setSelectedDate(undefined)
                setSelectedTime('')
                setMessage('')
                setPhone('')
            }, 2000)

        } catch (error) {
            console.error('Error scheduling viewing:', error)
            alert('Failed to schedule viewing. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const isDateDisabled = (date: Date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    // Debug states
    React.useEffect(() => {
        console.log('Form States:', {
            selectedDate,
            selectedTime,
            phone,
            isSubmitting,
            isButtonDisabled: !selectedDate || !selectedTime || isSubmitting || !phone
        })
    }, [selectedDate, selectedTime, phone, isSubmitting])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='w-[200px]'>Schedule Viewing</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Schedule Viewing</DialogTitle>
                        <DialogDescription asChild>
                            <div className="text-muted-foreground text-sm mt-2">
                                Book a viewing for "<strong>{property.title}</strong>"
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    
                    {success ? (
                        <div className='text-center py-8 space-y-4'>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Viewing Scheduled!</h1>
                            <p className="text-gray-600">We'll contact you soon to confirm your appointment</p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Calendar Section */}
                            <div className="space-y-3">
                                <Label htmlFor="calendar" className="text-base font-semibold">
                                    Select Date *
                                </Label>
                                <div className="border rounded-lg p-4">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        disabled={isDateDisabled}
                                        className="w-full"
                                    />
                                </div>
                                {!selectedDate && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Please select a date
                                    </p>
                                )}
                            </div>

                            {/* Time Selection */}
                            <div className='space-y-3'>
                                <Label className="text-base font-semibold">
                                    Select Time *
                                </Label>
                                <div className='grid grid-cols-3 gap-3'>
                                    {availableTimes.map((time) => (
                                        <Button
                                            key={time}
                                            type='button'
                                            onClick={() => setSelectedTime(time)}
                                            className={`p-3 text-sm font-medium rounded-md transition-all duration-200 ${
                                                selectedTime === time 
                                                    ? "bg-red-600 text-white shadow-lg scale-105" 
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                                            }`}
                                            variant="ghost"
                                        >
                                            <Clock className='w-4 h-4 inline mr-2'/>
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                                {!selectedTime && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Please select a time
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className='space-y-3'>
                                <Label htmlFor="phone" className="text-base font-semibold">
                                    Phone Number *
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    placeholder="Enter your phone number"
                                    className="p-3 text-base"
                                />
                                {!phone && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Phone number is required
                                    </p>
                                )}
                            </div>

                            {/* Message */}
                            <div className='space-y-3'>
                                <Label htmlFor="message" className="text-base font-semibold">
                                    Message (Optional)
                                </Label>
                                <Textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Any specific requirements, questions, or additional information..."
                                    className="min-h-[100px] resize-vertical p-3 text-base"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="space-y-3">
                                <Button 
                                    type='submit' 
                                    disabled={!selectedDate || !selectedTime || isSubmitting || !phone}
                                    className={`w-full py-3 text-base font-semibold transition-all duration-200 ${
                                        (!selectedDate || !selectedTime || !phone) 
                                            ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                                            : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                                    }`}
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Scheduling Viewing...
                                        </div>
                                    ) : (
                                        "Schedule Viewing"
                                    )}
                                </Button>

                                {/* Help Text */}
                                {(!selectedDate || !selectedTime || !phone) && (
                                    <p className="text-sm text-gray-500 text-center">
                                        Please select a date, time, and provide your phone number to schedule the viewing
                                    </p>
                                )}
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ScheduleViewing