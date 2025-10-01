import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import 'dayjs/locale/id.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export function formatDate(iso, withSecond = true) {
    const fmt = withSecond ? 'DD MMMM YYYY, HH:mm:ss' : 'DD MMMM YYYY, HH:mm';
    return dayjs(iso).tz('Asia/Jakarta').format(fmt).locale('id');
}