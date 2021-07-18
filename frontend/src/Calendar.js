import './Resources/calendar.css';

const Calendar = () => {
    return ( 
        <iframe 
        src="https://calendar.google.com/calendar/embed?height=400&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FColombo&amp;src=Zzk2NDcuc3VuZXJhQGdtYWlsLmNvbQ&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23039BE5&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=0&amp;showTabs=0&amp;showPrint=0" 
        className="c1"
        style={{border:'solid' + '1px' + '#777'}} 
        width="400" 
        height="400" 
        frameBorder="0" 
        scrolling="no"></iframe>
        
     );
}
 
export default Calendar;