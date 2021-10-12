from django.db import models


class Author(models.Model):
    first_name = models.CharField(verbose_name='фамилия', max_length=64)
    last_name = models.CharField(verbose_name='имя', max_length=64)
    birthday = models.PositiveIntegerField(verbose_name='год рождения')

    def __str__(self):
        return '%s %s' % (self.last_name, self.first_name)
    
    class Meta:
        verbose_name_plural = 'Авторы'


class Biography(models.Model):
    text = models.TextField(verbose_name='биография')
    author = models.OneToOneField(Author, on_delete=models.CASCADE, related_name='biography', verbose_name='автор')

    def __str__(self):
        return self.text


class Book(models.Model):
    title = models.CharField(verbose_name='название книги', max_length=64)
    authors = models.ManyToManyField(Author, verbose_name='авторы книги')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Книги'


class Article(models.Model):
    title = models.CharField(verbose_name='название статьи', max_length=128)
    text = models.TextField(verbose_name='текст статьи')
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='article', verbose_name='автор статьи')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Статьи'



