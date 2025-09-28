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
import {  Clock, Key } from 'lucide-react'
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
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const {user} = useUser()
    const [selectedTime,setSelectedTime] = useState("")
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

    if(!selectedDate || !selectedTime){
        alert("Please select date and time")
        return
    }
    if(!user) {
        alert("please signin")
        return
    }
    setIsSubmitting(true)

    try{
        await createViewing({
            propertyId: property?._id,
            propertyTitle:property?.title,
            userEmail: user?.emailAddresses?.[0]?.emailAddress,
            userName: user.fullName || user.firstName || 'Unknown',
            userPhone: phone,
            viewingDate: format(selectedDate, "yyyy-MM-dd"),
            viewingTime:selectedTime,
            userId:user.id,
            message: message,
        })
        setSuccess(true)
        setTimeout(()=> {
            setSuccess(false)
            setSelectedDate(undefined)
            setSelectedTime('')
            setMessage('')
            setPhone('')
        }, 2000)

    }catch(error){
        console.error('Error scheduling viewing:', error)
        alert('Failed to schedule viewing. Please try again.')
    }finally{
        setIsSubmitting(false)
    }
   }

   const isDateDisabled =(date: Date)=>{
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
   }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-[200px]'>Schedule Viewing</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {/* Add DialogTitle - this is required for accessibility */}
                    <DialogTitle>Schedule Viewing</DialogTitle>
                    <DialogDescription asChild>
                        <div className="text-muted-foreground text-sm">
                            Book a viewing for "{property.title}"
                        </div>
                    </DialogDescription>
                </DialogHeader>
                
                {success ? (
                    <div className='text-center py-8'>
                        <h1 className="text-xl font-bold mb-2">Viewing Scheduled</h1>
                        <p className="text-gray-600">We'll contact you soon to confirm your appointment</p>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Calendar */}
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={isDateDisabled}
                            className="rounded-lg border w-full"
                        />

                        {/* Time Selection */}
                        <div className='space-y-2'>
                            <Label>Select Time</Label>
                            <div className='grid grid-cols-3 gap-2'>
                                {availableTimes?.map((time)=> (
                                    <Button
                                        key={time}
                                        type='button'
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-2 text-sm border rounded-md transition-colors  ${selectedTime === time ? "bg-red-700 text-white": "bg-white text-black hover:bg-gray-200"}`}
                                        variant="outline"
                                    >
                                        <Clock className='w-3 h-3 inline mr-1'/>
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className='space-y-2'>
                            <Label className='my-2'>Phone *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange = {(e)=> setPhone(e.target.value)}
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className='space-y-2'>
                            <Label className='my-2'>Message (optional)</Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange = {(e)=> setMessage(e.target.value)}
                                placeholder="Any specific requirements or questions..."
                            />
                        </div>  

                        <Button 
                            type='submit' 
                            disabled={!selectedDate || !selectedTime || isSubmitting || !phone}
                            className="w-full"
                        >
                            {isSubmitting ? "Scheduling..." : "Schedule Viewing"}
                        </Button>   
                    </form>
                )}
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ScheduleViewing