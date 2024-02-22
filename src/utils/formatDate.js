const timeagoFormatter = (value, unit, suffix) => {
    if(unit === 'second' && value <= 20) {
        return 'a few seconds ago';
    }
    if(unit === 'second' && value > 20) {
        return 'less than a minute ago';
    }
    if(unit === 'day' && value === 1){
        return 'Yesterday'
    }

    return [value, unit + (value != 1 ? 's' : ''), suffix].join(' ');
}

export {
    timeagoFormatter
};