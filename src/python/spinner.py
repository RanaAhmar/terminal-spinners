import sys
import time
import threading

class Spinner:
    SPINNERS = {
        'dots': {
            'interval': 0.08,
            'frames': ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
        },
        'classic': {
            'interval': 0.2,
            'frames': ["[    ]", "[=   ]", "[==  ]", "[=== ]", "[ ===]", "[  ==]", "[   =]", "[    ]"]
        }
    }

    def __init__(self, type='dots'):
        self.spinner = self.SPINNERS.get(type, self.SPINNERS['dots'])
        self.stop_event = threading.Event()
        self.thread = None

    def _animate(self, message):
        while not self.stop_event.is_set():
            for frame in self.spinner['frames']:
                if self.stop_event.is_set():
                    break
                sys.stdout.write(f"\r{frame} {message}")
                sys.stdout.flush()
                time.sleep(self.spinner['interval'])

    def start(self, message=''):
        self.stop_event.clear()
        self.thread = threading.Thread(target=self._animate, args=(message,))
        self.thread.daemon = True
        self.thread.start()

    def stop(self, final_message=''):
        self.stop_event.set()
        if self.thread:
            self.thread.join()
        sys.stdout.write(f"\r{final_message}\n")
        sys.stdout.flush()
