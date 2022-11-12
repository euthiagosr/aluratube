import { createClient } from '@supabase/supabase-js'

const BASE_URL = 'https://nujpayunrclbcwhyasmw.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51anBheXVucmNsYmN3aHlhc213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDI2OTMsImV4cCI6MTk4Mzc3ODY5M30.GAnBHwK8VUE-n7XJJw8H0tZ1Xzgah5UjyXpk8I8FMKk';
const supabase = createClient(BASE_URL, KEY);

export function videoService(){
    return {
        getAllVideos(){
            return (
                supabase.from("Videos")
                .select("*")
            )
        },
        async insertRecord(recordToInsert){
            const title = recordToInsert.title;
            const url = recordToInsert.url;
            const thumb = recordToInsert.thumb;
            const playlist = 'Recently Added';

            return (
                await supabase.from('Videos')
                .insert({title: title, url: url, thumb: thumb, playlist: playlist}).then(() => {
                    alert('Video salvo com sucesso!');
                    window.location.reload(false);
                })
            )
        }
    }
}