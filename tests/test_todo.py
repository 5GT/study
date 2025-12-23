import json
from pathlib import Path

import pytest

from todo import TodoList


def test_add_and_list(tmp_path: Path):
    storage = tmp_path / "todos.json"
    todo = TodoList(storage=storage)

    first = todo.add("첫 번째")
    second = todo.add("두 번째")

    assert first.id == 1
    assert second.id == 2

    items = todo.load()
    assert len(items) == 2
    assert items[0].text == "첫 번째"
    assert items[1].text == "두 번째"


def test_toggle_and_remove(tmp_path: Path):
    storage = tmp_path / "todos.json"
    todo = TodoList(storage=storage)

    item = todo.add("완료 테스트")
    todo.toggle(item.id, done=True)
    updated = todo.load()[0]
    assert updated.done is True

    todo.toggle(item.id, done=False)
    reopened = todo.load()[0]
    assert reopened.done is False

    todo.remove(item.id)
    assert todo.load() == []


def test_clear(tmp_path: Path):
    storage = tmp_path / "todos.json"
    todo = TodoList(storage=storage)

    todo.add("하나")
    todo.add("둘")
    todo.clear()

    assert todo.load() == []


def test_persisted_format_is_json(tmp_path: Path):
    storage = tmp_path / "todos.json"
    todo = TodoList(storage=storage)
    todo.add("json 저장 확인")

    with storage.open(encoding="utf-8") as fh:
        data = json.load(fh)

    assert isinstance(data, list)
    assert data[0]["text"] == "json 저장 확인"
