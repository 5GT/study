from __future__ import annotations

import argparse
import json
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Iterable, List


DEFAULT_STORAGE = Path(__file__).with_name("todos.json")


@dataclass
class TodoItem:
    """A single to-do item."""

    id: int
    text: str
    done: bool = False

    @classmethod
    def from_dict(cls, raw: dict) -> "TodoItem":
        return cls(id=raw["id"], text=raw["text"], done=raw.get("done", False))


class TodoList:
    """Manage a list of to-do items persisted to disk."""

    def __init__(self, storage: Path = DEFAULT_STORAGE):
        self.storage = storage

    def load(self) -> List[TodoItem]:
        if not self.storage.exists():
            return []
        with self.storage.open("r", encoding="utf-8") as fh:
            data = json.load(fh)
        return [TodoItem.from_dict(item) for item in data]

    def save(self, items: Iterable[TodoItem]) -> None:
        items_list = list(items)
        with self.storage.open("w", encoding="utf-8") as fh:
            json.dump([asdict(item) for item in items_list], fh, indent=2, ensure_ascii=False)

    def add(self, text: str) -> TodoItem:
        items = self.load()
        next_id = (max((item.id for item in items), default=0) + 1)
        new_item = TodoItem(id=next_id, text=text)
        items.append(new_item)
        self.save(items)
        return new_item

    def toggle(self, task_id: int, done: bool = True) -> TodoItem:
        items = self.load()
        for item in items:
            if item.id == task_id:
                item.done = done
                self.save(items)
                return item
        raise ValueError(f"Task with id {task_id} not found.")

    def remove(self, task_id: int) -> TodoItem:
        items = self.load()
        for idx, item in enumerate(items):
            if item.id == task_id:
                removed = items.pop(idx)
                self.save(items)
                return removed
        raise ValueError(f"Task with id {task_id} not found.")

    def clear(self) -> None:
        self.save([])


def format_item(item: TodoItem) -> str:
    status = "☑" if item.done else "☐"
    return f"{status} {item.id}: {item.text}"


def cmd_add(todo_list: TodoList, args: argparse.Namespace) -> None:
    created = todo_list.add(args.text)
    print(f"Added task #{created.id}: {created.text}")


def cmd_list(todo_list: TodoList, args: argparse.Namespace) -> None:
    items = todo_list.load()
    if args.pending:
        items = [item for item in items if not item.done]
    elif args.done:
        items = [item for item in items if item.done]

    if not items:
        print("No tasks found.")
        return

    for item in items:
        print(format_item(item))


def cmd_done(todo_list: TodoList, args: argparse.Namespace) -> None:
    updated = todo_list.toggle(args.id, done=True)
    print(f"Marked task #{updated.id} as done.")


def cmd_undone(todo_list: TodoList, args: argparse.Namespace) -> None:
    updated = todo_list.toggle(args.id, done=False)
    print(f"Reopened task #{updated.id}.")


def cmd_remove(todo_list: TodoList, args: argparse.Namespace) -> None:
    removed = todo_list.remove(args.id)
    print(f"Removed task #{removed.id}.")


def cmd_clear(todo_list: TodoList, args: argparse.Namespace) -> None:
    todo_list.clear()
    print("Cleared all tasks.")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="간단한 투두 메모장 CLI")
    parser.add_argument(
        "--storage",
        type=Path,
        default=DEFAULT_STORAGE,
        help=f"저장 파일 경로 (기본값: {DEFAULT_STORAGE})",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    add_parser = subparsers.add_parser("add", help="새 할 일을 추가합니다")
    add_parser.add_argument("text", help="할 일 내용")
    add_parser.set_defaults(func=cmd_add)

    list_parser = subparsers.add_parser("list", help="할 일을 확인합니다")
    list_group = list_parser.add_mutually_exclusive_group()
    list_group.add_argument("--pending", action="store_true", help="미완료 항목만 표시")
    list_group.add_argument("--done", action="store_true", help="완료 항목만 표시")
    list_parser.set_defaults(func=cmd_list)

    done_parser = subparsers.add_parser("done", help="할 일을 완료로 표시합니다")
    done_parser.add_argument("id", type=int, help="완료할 항목의 ID")
    done_parser.set_defaults(func=cmd_done)

    undone_parser = subparsers.add_parser("undone", help="완료 표시를 해제합니다")
    undone_parser.add_argument("id", type=int, help="다시 열 항목의 ID")
    undone_parser.set_defaults(func=cmd_undone)

    remove_parser = subparsers.add_parser("remove", help="할 일을 삭제합니다")
    remove_parser.add_argument("id", type=int, help="삭제할 항목의 ID")
    remove_parser.set_defaults(func=cmd_remove)

    clear_parser = subparsers.add_parser("clear", help="모든 할 일을 삭제합니다")
    clear_parser.set_defaults(func=cmd_clear)

    return parser


def main(argv: List[str] | None = None) -> None:
    parser = build_parser()
    args = parser.parse_args(argv)
    todo_list = TodoList(storage=args.storage)
    args.func(todo_list, args)


if __name__ == "__main__":
    main()
