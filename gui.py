from __future__ import annotations

import argparse
import tkinter as tk
from tkinter import messagebox
from pathlib import Path

from todo import DEFAULT_STORAGE, TodoList, format_item


class TodoApp:
    def __init__(self, storage: Path = DEFAULT_STORAGE):
        self.todo_list = TodoList(storage=storage)
        self.root = tk.Tk()
        self.root.title("투두 메모장")

        self.entry = tk.Entry(self.root, width=40)
        self.entry.grid(row=0, column=0, columnspan=4, padx=8, pady=8, sticky="ew")

        add_button = tk.Button(self.root, text="추가", command=self.add_task)
        add_button.grid(row=0, column=4, padx=4, pady=8)

        self.listbox = tk.Listbox(self.root, width=60, height=12)
        self.listbox.grid(row=1, column=0, columnspan=5, padx=8, pady=(0, 8), sticky="nsew")

        self.root.grid_columnconfigure(0, weight=1)
        self.root.grid_rowconfigure(1, weight=1)

        done_button = tk.Button(self.root, text="완료", command=self.mark_done)
        done_button.grid(row=2, column=0, padx=4, pady=4, sticky="ew")

        undone_button = tk.Button(self.root, text="되돌리기", command=self.mark_undone)
        undone_button.grid(row=2, column=1, padx=4, pady=4, sticky="ew")

        remove_button = tk.Button(self.root, text="삭제", command=self.remove_task)
        remove_button.grid(row=2, column=2, padx=4, pady=4, sticky="ew")

        clear_button = tk.Button(self.root, text="모두 삭제", command=self.clear_all)
        clear_button.grid(row=2, column=3, padx=4, pady=4, sticky="ew")

        refresh_button = tk.Button(self.root, text="새로고침", command=self.refresh_list)
        refresh_button.grid(row=2, column=4, padx=4, pady=4, sticky="ew")

        self.refresh_list()

    def add_task(self) -> None:
        text = self.entry.get().strip()
        if not text:
            messagebox.showinfo("알림", "할 일 내용을 입력하세요.")
            return
        self.todo_list.add(text)
        self.entry.delete(0, tk.END)
        self.refresh_list()

    def mark_done(self) -> None:
        task_id = self.selected_id()
        if task_id is None:
            return
        self.todo_list.toggle(task_id, done=True)
        self.refresh_list()

    def mark_undone(self) -> None:
        task_id = self.selected_id()
        if task_id is None:
            return
        self.todo_list.toggle(task_id, done=False)
        self.refresh_list()

    def remove_task(self) -> None:
        task_id = self.selected_id()
        if task_id is None:
            return
        self.todo_list.remove(task_id)
        self.refresh_list()

    def clear_all(self) -> None:
        if messagebox.askyesno("확인", "모든 할 일을 삭제할까요?"):
            self.todo_list.clear()
            self.refresh_list()

    def selected_id(self) -> int | None:
        if not self.listbox.curselection():
            messagebox.showinfo("알림", "항목을 선택하세요.")
            return None
        line = self.listbox.get(self.listbox.curselection()[0])
        try:
            return int(line.split(" ", 2)[1].split(":", 1)[0])
        except (IndexError, ValueError):
            messagebox.showerror("오류", "선택한 항목을 읽을 수 없습니다.")
            return None

    def refresh_list(self) -> None:
        self.listbox.delete(0, tk.END)
        for item in self.todo_list.load():
            self.listbox.insert(tk.END, format_item(item))

    def run(self) -> None:
        self.root.mainloop()


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="투두 메모장 GUI")
    parser.add_argument(
        "--storage",
        type=Path,
        default=DEFAULT_STORAGE,
        help=f"저장 파일 경로 (기본값: {DEFAULT_STORAGE})",
    )
    args = parser.parse_args(argv)

    app = TodoApp(storage=args.storage)
    app.run()


if __name__ == "__main__":
    main()
