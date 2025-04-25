

export function formatDate(date) { 
    const parseDate = new Date(date); 
    if (isNaN(parseDate.getTime())) { 
        return 'sin fecha'; 
    }
    const day = String(parseDate.getDate()).padStart(2, '0');
    const month = String(parseDate.getMonth() + 1).padStart(2, '0');
    const year = parseDate.getFullYear();
    return `${day}/${month}/${year}`;
}