import sys
import ffmpeg
import json
import datetime
PART = 1
TRANSITION = 2

data = sys.argv[1]

state = json.loads(data)


def time_to_seconds(time_string):
    date_time = datetime.datetime.strptime(time_string, "%H:%M:%S")
    a_timedelta = date_time - datetime.datetime(1900, 1, 1)
    return int(a_timedelta.total_seconds())

def get_object(key,parts, transitionsVideo):
    if key in parts:
        return parts[key], PART
    elif key in transitionsVideo:
        return transitionsVideo[key], TRANSITION
    return None, None

def join_and_save(state):
    resultVideo = state['resultVideo']
    sourceVideo = state['sourceVideo']
    parts = state['parts']
    transitionsVideo = state['transitionsVideo']

    resultKeys = resultVideo['result']
    try:
        in_file = ffmpeg.input(sourceVideo['videoInformation'])
        vid = in_file.video.filter_multi_output('split')
        aud = in_file.audio.filter_multi_output('asplit')
        trims = []
        for key in resultKeys:
            video, videoType = get_object(key, parts, transitionsVideo)
            if videoType == PART:
                start_seconds = time_to_seconds(video['init'])
                end_seconds = time_to_seconds(video['end'])
                v = vid[k].trim(start=start_seconds, end=end_seconds).setpts('PTS-STARTPTS')
                a = aud[k].filter('atrim', start=start_seconds, end=end_seconds).filter('asetpts',expr='PTS-STARTPTS')
                trims.extend((v, a))
        out = ffmpeg.concat(*trims, v=1, a=1).output("/Users/luifer/Movies/LQCLD/Sessions/2020-06-03 20.22.05 Brandon Jason Valle Tamayo_s Personal Meeting Room 8097921746/zoom_1.mp4")
        out = ffmpeg.overwrite_output(out)
        out.run()
    except ffmpeg.Error as e:
        print("holaaaasdfsafsdfasdfadsfasdfasfdasa")
        print(e)
        print(e.stderr)
    return 'hola'

print(join_and_save(state))
