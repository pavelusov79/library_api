from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters

from .models import Author, Article, Book, Biography
from .serializers import *                   


class BookFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Book
        fields = ['title', 'authors']


class AuthorPaginationClass(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    pagination_class = AuthorPaginationClass
    filterset_fields = ['first_name']


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filterset_fields = ['author']


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filterset_class = BookFilter


class BiographyViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographySerializer



