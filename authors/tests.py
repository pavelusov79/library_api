from django.test import TestCase
from rest_framework import status
from rest_framework.test import force_authenticate, APIClient
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from .models import Author, Biography, Book, Article


class TestCaseApp(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_superuser('admin', 'admin@admin.com', '12345')
        self.token = Token.objects.create(user=self.user)
        self.author = Author.objects.create(first_name='Pushkin', last_name='Alexander', birthday=1799)
        Biography.objects.create(text='biography', author=self.author)
        book = Book(title='Title')
        book.save()
        book.authors.add(self.author)
        Article.objects.create(title="Article title", text="text", author=self.author)

    def test_auth_authors(self):
        self.client.force_authenticate(user=self.user, token=self.token.key)
        request = self.client.get('/api/authors/')
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_login(self):
        res = self.client.get('/api-auth/login/', {"username": self.user.username, "password": self.user.password})
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_biography_list(self):
        self.client.force_authenticate(user=self.user, token=self.token.key)
        res = self.client.get('/api/biography/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.author.id, 1)

    def test_books_list(self):
        self.client.force_authenticate(user=self.user, token=self.token.key)
        res = self.client.get('/api/books/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_articles_list(self):
        self.client.force_authenticate(user=self.user, token=self.token.key)
        res = self.client.get('/api/articles/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
