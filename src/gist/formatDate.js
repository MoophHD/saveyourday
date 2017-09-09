export default function formatDate(args, separator=':') {
    let h,m,s;
    h = args[0];
    m = args[1];
    s = args[2];
    
    
    h = h > 9 ? h.toString() : '0' + h.toString();
    m = m > 9 ? m.toString() : '0' + m.toString();
    if (s != undefined) {
      s = s > 9 ? s.toString() : '0' + s.toString();
      return (h + separator + m + separator + s)
    } else {
      return (h + separator + m);
    }
}