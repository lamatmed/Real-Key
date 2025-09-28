function ScheduleViewing({ property }: ScheduleViewingProps) {
    // ... vos states existants ...

    // Ajoutez un effet pour déboguer
    React.useEffect(() => {
        console.log('Selected Date:', selectedDate);
        console.log('Selected Time:', selectedTime);
        console.log('Is Submitting:', isSubmitting);
    }, [selectedDate, selectedTime, isSubmitting]);

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='w-[200px]'>Schedule Viewing</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
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
                            {/* Calendar avec indication de sélection */}
                            <div className="space-y-2">
                                <Label>Select Date *</Label>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={isDateDisabled}
                                    className="rounded-lg border w-full"
                                />
                                {!selectedDate && (
                                    <p className="text-sm text-red-500">Please select a date</p>
                                )}
                            </div>

                            {/* Time Selection avec indication */}
                            <div className='space-y-2'>
                                <Label>Select Time *</Label>
                                <div className='grid grid-cols-3 gap-2'>
                                    {availableTimes?.map((time)=> (
                                        <Button
                                            key={time}
                                            type='button'
                                            onClick={() => setSelectedTime(time)}
                                            className={`p-2 text-sm border rounded-md transition-colors ${
                                                selectedTime === time 
                                                    ? "bg-red-700 text-white" 
                                                    : "bg-white text-black hover:bg-gray-200"
                                            }`}
                                            variant="outline"
                                        >
                                            <Clock className='w-3 h-3 inline mr-1'/>
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                                {!selectedTime && (
                                    <p className="text-sm text-red-500">Please select a time</p>
                                )}
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

                            {/* Bouton avec meilleur feedback */}
                            <Button 
                                type='submit' 
                                disabled={!selectedDate || !selectedTime || isSubmitting || !phone}
                                className={`w-full ${
                                    (!selectedDate || !selectedTime || !phone) 
                                        ? "bg-gray-400 cursor-not-allowed" 
                                        : "bg-red-600 hover:bg-red-700"
                                }`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Scheduling...
                                    </div>
                                ) : (
                                    "Schedule Viewing"
                                )}
                            </Button>

                            {/* Message d'aide */}
                            {(!selectedDate || !selectedTime || !phone) && (
                                <p className="text-sm text-gray-500 text-center">
                                    Please select date, time and provide phone number to continue
                                </p>
                            )}
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}